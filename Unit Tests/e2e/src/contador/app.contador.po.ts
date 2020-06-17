import { AppBasePage } from '../app.base.po';

export class AppContadorPage extends AppBasePage {
    constructor() {
        super();
    }

    campoValor = this.obterElementoXpath('/html/body/app-root/app-contator/div/div/div/div/p');
    campoIncrementar = this.obterElementoXpath('/html/body/app-root/app-contator/div/div/div/div/div/button[1]');
    campoDecrementar = this.obterElementoXpath('/html/body/app-root/app-contator/div/div/div/div/div/button[2]');

    navegarParaContador() {
        this.navegarViaUrl('/contador');
    }

    navegarParaContadorPorLink() {
        this.navegarPorLink('Contador');
    }

    iniciarNavegacao() {
        this.navegarParaHome();
        this.navegarParaContadorPorLink();
    }

    obterTituloContador() {
        return this.obterElementoXpath('/html/body/app-root/app-contator/div/h1').getText();
    }
}
