import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {
  public LocalStorage = new LocalStorageUtils();
  protected UrlServiceV1 = 'https://localhost:44339/api/v1/';

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
      }
    }

    console.error(response);
    return throwError(response);
  }
}
