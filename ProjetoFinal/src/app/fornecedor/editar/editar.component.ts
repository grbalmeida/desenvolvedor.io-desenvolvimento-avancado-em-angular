import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { Endereco } from '../models/endereco';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  fornecedorForm: FormGroup;
  enderecoForm: FormGroup;

  fornecedor: Fornecedor = new Fornecedor();
  endereco: Endereco = new Endereco();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento = '';

  tipoFornecedor: number;
  formResult = '';

  mudancasNaoSalvas: boolean;

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {

    this.validationMessages = {
      name: {
        required: 'Informe o Nome',
      },
      document: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      street: {
        required: 'Informe o Logradouro',
      },
      number: {
        required: 'Informe o Número',
      },
      district: {
        required: 'Informe o Bairro',
      },
      postalCode: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      city: {
        required: 'Informe a Cidade',
      },
      state: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.fornecedor = this.route.snapshot.data.fornecedor;
    this.tipoFornecedor = this.fornecedor.supplierType;
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      document: '',
      active: ['', [Validators.required]],
      supplierType: ['', [Validators.required]]
    });

    this.preencherForm();

    this.enderecoForm = this.fb.group({
      id: '',
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      district: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      supplierId: ''
    });
  }

  preencherForm() {
    this.fornecedorForm.patchValue({
      id: this.fornecedor.id,
      name: this.fornecedor.name,
      active: this.fornecedor.active,
      supplierType: this.fornecedor.supplierType.toString(),
      document: this.fornecedor.document
    });

    if (this.tipoFornecedorForm.value === '1') {
      this.documento.setValidators([Validators.required, NgBrazilValidators.cpf]);
    } else {
      this.documento.setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }
  }

  ngAfterViewInit() {
    this.tipoFornecedorForm.valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });

    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  trocarValidacaoDocumento() {
    this.documento.clearValidators();

    if (this.tipoFornecedorForm.value === '1') {
      this.documento.setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = 'CPF (requerido)';
    } else {
      this.documento.setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = 'CNPJ (requerido)';
    }
  }

  get tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('supplierType');
  }

  get documento(): AbstractControl {
    return this.fornecedorForm.get('document');
  }

  editarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

      this.fornecedorService.atualizarFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    const toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
