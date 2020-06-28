import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta } from '../models/endereco';

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
    return this.http
      .get<Fornecedor>(`${this.UrlServiceV1}suppliers/${id}`, this.ObterAuthHeaderJson())
      .pipe(
        catchError(super.serviceError)
      );
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .post(this.UrlServiceV1 + 'suppliers', fornecedor, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  excluirFornecedor(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}
