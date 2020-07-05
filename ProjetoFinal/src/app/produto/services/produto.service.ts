import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Produto, Fornecedor } from '../models/produto';

@Injectable()
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(this.UrlServiceV1 + 'products', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Produto> {
    return this.http
      .get<Produto>(this.UrlServiceV1 + 'products/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoProduto(produto: Produto): Observable<Produto> {
    return this.http
      .post(this.UrlServiceV1 + 'products', produto, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put(this.UrlServiceV1 + 'products/' + produto.id, produto, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirProduto(id: string): Observable<Produto> {
    return this.http
      .delete(this.UrlServiceV1 + 'products/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  obterFornecedores(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(this.UrlServiceV1 + 'suppliers')
      .pipe(catchError(super.serviceError));
  }
}
