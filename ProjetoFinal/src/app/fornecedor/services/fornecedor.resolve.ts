import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from '../models/fornecedor';

@Injectable()
export class FornecedorResolve implements Resolve<Fornecedor> {
  constructor(private fornecedorService: FornecedorService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.fornecedorService.obterPorId(route.params.id);
  }
}
