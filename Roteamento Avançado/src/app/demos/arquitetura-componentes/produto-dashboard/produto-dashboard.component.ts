import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable, fromEvent } from 'rxjs';
import { ProdutoCountComponent } from '../componentes/produto-count.component';
import { ProdutoDetalheComponent } from '../componentes/produto-card-detalhe.component';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit, AfterViewInit {
  produtos: Produto[];

  @ViewChild(ProdutoCountComponent, { static: false }) contador: ProdutoCountComponent;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef;

  @ViewChildren(ProdutoDetalheComponent) botoes: QueryList<ProdutoDetalheComponent>;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtos = this.produtoService.obterTodos();
  }

  ngAfterViewInit(): void {
    console.log('Objeto do Contador: ', this.contador.produtos);

    const clickTexto: Observable<any> = fromEvent(this.mensagemTela.nativeElement, 'click');
    
    clickTexto.subscribe(() => {
      alert('Clicou no texto!');
      return;
    });

    console.log(this.botoes);

    this.botoes.forEach(p => {
      console.log(p.produto);
    });
  }

  mudarStatus(event: Produto) {
    event.ativo = !event.ativo;
  }

}
