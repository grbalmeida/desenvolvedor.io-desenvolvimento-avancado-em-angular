import { Component, OnInit } from '@angular/core';
import { Filme } from './filme';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styles: [
  ]
})
export class FilmesComponent implements OnInit {

  filmes: Filme[];

  ngOnInit() {
    this.filmes = [
      {
        nome: 'Um Sonho de Liberdade',
        dataLancamento: new Date('12/07/1994'),
        valor: 150.00,
        imagem: 'sonhoLiberdade.jpg',
        tamanho: '513326980'
      },
      {
        nome: 'O Poderoso Chefão',
        dataLancamento: new Date('01/12/1972'),
        valor: 200.00,
        imagem: 'poderosoChefaoI.jpg',
        tamanho: '1342177280'
      },
      {
        nome: 'Batman: O Cavaleiro das Trevas',
        dataLancamento: new Date('08/01/2008'),
        valor: 70.00,
        imagem: 'Batman2008.jpg',
        tamanho: '719974720'
      },
      {
        nome: 'o poderoso chefão 2',
        dataLancamento: new Date('01/12/1974'),
        valor: 120.00,
        imagem: 'poderosoChefaoII.jpg',
        tamanho: '1254589899'
      },
      {
        nome: 'Pulp Fiction: Tempo de Violência',
        dataLancamento: new Date('01/08/1994'),
        valor: 190.00,
        imagem: 'PulpFiction.jpg',
        tamanho: '773039680'
      }
    ];
  }

}
