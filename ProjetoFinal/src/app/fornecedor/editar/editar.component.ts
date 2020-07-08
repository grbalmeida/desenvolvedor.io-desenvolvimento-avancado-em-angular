import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { Endereco, CepConsulta } from '../models/endereco';
import { FornecedorService } from '../services/fornecedor.service';
import { StringUtils } from 'src/app/utils/string-utils';
import { FornecedorFormBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FornecedorFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorsEndereco: any[] = [];
  enderecoForm: FormGroup;
  endereco: Endereco = new Endereco();
  textoDocumento = '';
  tipoFornecedor: number;

  constructor(
    private fb: FormBuilder,
    protected fornecedorService: FornecedorService,
    private router: Router,
    protected toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    super(toastr, fornecedorService);

    this.fornecedor = this.route.snapshot.data.fornecedor;
    this.tipoFornecedor = this.fornecedor.supplierType;
  }

  ngOnInit() {
    this.spinner.show();

    this.fornecedorForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      document: '',
      active: ['', [Validators.required]],
      supplierType: ['', [Validators.required]]
    });

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

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
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

    this.enderecoForm.patchValue({
      ...this.fornecedor.address
    });
  }

  ngAfterViewInit() {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.enderecoForm.patchValue({
      street: cepConsulta.logradouro,
      district: cepConsulta.bairro,
      postalCode: cepConsulta.cep,
      city: cepConsulta.localidade,
      state: cepConsulta.uf
    });
  }

  editarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.fornecedor.address.postalCode = StringUtils.somenteNumeros(this.fornecedor.address.postalCode);
      this.fornecedor.document = StringUtils.somenteNumeros(this.fornecedor.document);

      this.fornecedorService.atualizarFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.errors = [];

    const toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);
      this.endereco.postalCode = StringUtils.somenteNumeros(this.endereco.postalCode);
      this.endereco.supplierId = this.fornecedor.id;

      this.fornecedorService.atualizarEndereco(this.endereco)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha); }
        );
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.fornecedor.address = endereco;
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content: any) {
    this.modalService.open(content);
  }
}
