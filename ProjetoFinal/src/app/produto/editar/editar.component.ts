import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';

import { Produto, Fornecedor } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  produto: Produto;
  fornecedores: Fornecedor[];
  errors: any[] = [];
  produtoForm: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult = '';

  mudancasNaoSalvas: boolean;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      imagem: {
        required: 'Informe a Imagem',
      },
      valor: {
        required: 'Informe o Valor',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.produto = this.route.snapshot.data.produto;
  }

  ngOnInit(): void {

    this.produtoService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

    this.produtoForm = this.fb.group({
      supplierId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      image: [''],
      price: ['', [Validators.required]],
      active: [0]
    });

    this.produtoForm.patchValue({
      supplierId: this.produto.supplierId,
      id: this.produto.id,
      name: this.produto.name,
      description: this.produto.description,
      active: this.produto.active,
      price: this.produto.price
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
      this.mudancasNaoSalvas = true;
    });
  }

  editarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

