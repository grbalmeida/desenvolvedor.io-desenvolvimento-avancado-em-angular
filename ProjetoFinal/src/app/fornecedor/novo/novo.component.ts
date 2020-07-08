import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';

import { FornecedorService } from '../services/fornecedor.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/string-utils';
import { FornecedorFormBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FornecedorFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  textoDocumento = 'CPF (requerido)';

  constructor(
    private fb: FormBuilder,
    protected fornecedorService: FornecedorService,
    private router: Router,
    protected toastr: ToastrService
  ) {
    super(toastr, fornecedorService);
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      name: ['', [Validators.required]],
      document: ['', [Validators.required, NgBrazilValidators.cpf]],
      active: ['', [Validators.required]],
      supplierType: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        district: ['', [Validators.required]],
        postalCode: ['', [Validators.required, NgBrazilValidators.cep]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
      })
    });

    this.fornecedorForm.patchValue({ supplierType: '1', active: true });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.fornecedorForm.patchValue({
      address: {
        street: cepConsulta.logradouro,
        district: cepConsulta.bairro,
        postalCode: cepConsulta.cep,
        city: cepConsulta.localidade,
        state: cepConsulta.uf
      }
    });
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

      this.fornecedor.address.postalCode = StringUtils.somenteNumeros(this.fornecedor.address.postalCode);
      this.fornecedor.document = StringUtils.somenteNumeros(this.fornecedor.document);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          () => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );
    }
  }

  processarSucesso() {
    this.fornecedorForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    const toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }
}
