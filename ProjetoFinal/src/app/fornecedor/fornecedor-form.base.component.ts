import { ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';

import { Fornecedor } from './models/fornecedor';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../utils/generic-form-validation';
import { StringUtils } from '../utils/string-utils';
import { CepConsulta } from './models/endereco';
import { FornecedorService } from './services/fornecedor.service';

export abstract class FornecedorFormBaseComponent {
  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  textoDocumento: string;
  mudancasNaoSalvas: boolean;

  constructor(protected toastr: ToastrService, protected fornecedorService: FornecedorService) {
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
  }

  get tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('supplierType');
  }

  get documento(): AbstractControl {
    return this.fornecedorForm.get('document');
  }

  configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    this.tipoFornecedorForm.valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao(formInputElements);
      this.validarFormulario();
    });

    this.configurarElementosValidacao(formInputElements);
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

  configurarElementosValidacao(formInputElements: ElementRef[]) {
    const controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
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

  processarFalha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {}
}
