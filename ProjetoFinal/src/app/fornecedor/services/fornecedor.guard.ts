import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class FornecedorGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/conta/login']);
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

  navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }
}
