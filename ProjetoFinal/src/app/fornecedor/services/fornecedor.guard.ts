import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NovoComponent } from '../novo/novo.component';

@Injectable()
export class FornecedorGuard implements CanActivate, CanDeactivate<NovoComponent> {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url } });
    }

    const user = this.localStorageUtils.obterUsuario();
    let claim: any = routeAc.data[0];

    if (claim !== undefined) {
      claim = routeAc.data[0].claim;

      if (claim) {
        if (!user.claims) {
          this.navegarAcessoNegado();
        }

        const userClaims = user.claims.find(x => x.type === claim.nome);

        if (!userClaims) {
          this.navegarAcessoNegado();
        }

        const valoresClaim = userClaims.value as string;

        if (!valoresClaim.includes(claim.valor)) {
          this.navegarAcessoNegado();
        }
      }
    }

    return true;
  }

  canDeactivate(component: NovoComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }

    return true;
  }

  navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }
}
