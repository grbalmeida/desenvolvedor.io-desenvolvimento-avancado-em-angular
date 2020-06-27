import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';

@Injectable()
export class FornecedorService extends BaseService {
  fornecedor: Fornecedor = new Fornecedor();

  constructor(private http: HttpClient) {
    super();
    this.fornecedor.name = 'Teste Fake';
    this.fornecedor.document = '32165498754';
    this.fornecedor.active = true;
    this.fornecedor.supplierType = 1;
  }

  obterTodos(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(this.UrlServiceV1 + 'suppliers')
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  excluirFornecedor(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }
}
