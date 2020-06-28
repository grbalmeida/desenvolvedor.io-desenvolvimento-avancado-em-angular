import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Fornecedor } from '../models/fornecedor';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap: any;
  chave = 'AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.fornecedor = this.route.snapshot.data.fornecedor;
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=${this.EnderecoCompleto}&key=${this.chave}`
    );
  }

  get EnderecoCompleto(): string {
    const { street, number: addressNumber, district, city, state } = this.fornecedor.address;
    return `${street}, ${addressNumber} - ${district}, ${city} - ${state}`;
  }
}
