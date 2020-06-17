import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {
    constructor() {
        super();
    }

    navegarParaCadastro() {
        this.navegarViaUrl('/cadastro');
    }

    navegarParaCadastroPorLink() {
        this.navegarPorLink('Cadastro');
    }

    iniciarNavegacao() {
        this.navegarParaHome();
        this.navegarParaCadastroPorLink();
    }

    obterTituloCadastro() {
        return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/h4').getText();
    }
}
