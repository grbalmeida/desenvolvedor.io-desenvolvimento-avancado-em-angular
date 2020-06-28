import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { Endereco, CepConsulta } from '../models/endereco';
import { FornecedorService } from '../services/fornecedor.service';
import { StringUtils } from 'src/app/utils/string-utils';

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
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
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

  buscarCep(cep: string) {
    cep = StringUtils.somenteNumeros(cep);

    if (cep.length < 8) {
      return;
    }

    this.fornecedorService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
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
    console.log({content});
    this.modalService.open(content);
  }
}
