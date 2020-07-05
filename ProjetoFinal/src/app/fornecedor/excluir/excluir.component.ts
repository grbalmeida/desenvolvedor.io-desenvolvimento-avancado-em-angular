import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';

import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap: any;
  chave = 'AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE';
  errors: any[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {

    this.fornecedor = this.route.snapshot.data.fornecedor;
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=${this.EnderecoCompleto}&key=${this.chave}`
    );
  }

  excluirEvento() {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento); },
        error => { this.falha(error); }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Fornecedor excluído com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  falha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

  get EnderecoCompleto(): string {
    const { street, number: addressNumber, district, city, state } = this.fornecedor.address;
    return `${street}, ${addressNumber} - ${district}, ${city} - ${state}`;
  }
}
