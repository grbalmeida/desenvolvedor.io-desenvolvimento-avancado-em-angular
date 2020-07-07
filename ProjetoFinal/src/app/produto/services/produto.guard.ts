import { Injectable } from '@angular/core';
import { CanDeactivate, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NovoComponent } from '../novo/novo.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class ProdutoGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {

  constructor(protected router: Router) {
    super(router);
  }

  canDeactivate(component: NovoComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }

    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return this.validarClaims(routeAc);
  }
}
