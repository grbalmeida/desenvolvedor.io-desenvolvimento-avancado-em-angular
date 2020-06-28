import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta, Endereco } from '../models/endereco';

@Injectable()
export class FornecedorService extends BaseService {

  constructor(private http: HttpClient) {
    super();
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
      .post(this.UrlServiceV1 + 'suppliers', fornecedor, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .put(this.UrlServiceV1 + 'suppliers/' + fornecedor.id, fornecedor, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirFornecedor(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http
      .put(this.UrlServiceV1 + 'suppliers/update-address/' + endereco.id, endereco, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}
