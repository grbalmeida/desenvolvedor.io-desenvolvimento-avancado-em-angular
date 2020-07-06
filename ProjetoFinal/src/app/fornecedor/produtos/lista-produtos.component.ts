import { Component, Input } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/produto/models/produto';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produtos.component.html'
})
export class ListaProdutosComponent {
  imagens: string = environment.imagensUrl;

  @Input()
  produtos: Produto[];
}
