import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { ProdutoService } from '../services/produto.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProdutoFormBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoFormBaseComponent implements OnInit, AfterViewInit {

  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();

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
      price: CurrencyUtils.DecimalParaString(this.produto.price)
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    this.imagemOriginalSrc = this.imagens + this.produto.image;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      if (this.imageBase64) {
        this.produto.uploadImage = this.imageBase64;
        this.produto.image = this.imagemNome;
      }

      this.produto.price = CurrencyUtils.StringParaDecimal(this.produto.price.toString());

      console.log(this.produto);

      this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
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
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file: FileList) {
    this.imagemNome = file[0].name;

    const reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: ProgressEvent<FileReader>) {
    const binaryString = readerEvt.target.result as string;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = 'data:image/jpeg;base64,' + this.imageBase64;
  }
}

