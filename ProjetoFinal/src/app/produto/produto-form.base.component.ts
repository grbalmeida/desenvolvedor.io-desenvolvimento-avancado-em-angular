import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { utilsBr } from 'js-brasil';

import { Produto, Fornecedor } from './models/produto';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ProdutoFormBaseComponent extends FormBaseComponent {
  produto: Produto;
  fornecedores: Fornecedor[];
  errors: any[] = [];
  produtoForm: FormGroup;

  MASKS = utilsBr.MASKS;

  constructor() {
    super();

    this.validationMessages = {
      supplierId: {
        required: 'Escolha um fornecedor',
      },
      name: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      description: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      image: {
        required: 'Informe a Imagem',
      },
      price: {
        required: 'Informe o Valor',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
  }
}
