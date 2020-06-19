import { by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {

  constructor() {
    super();
  }

  campoEmail = element(by.id('email'));
  campoSenha = element(by.id('password'));
  campoSenhaConfirmacao = element(by.id('confirmPassword'));

  botaoRegistrar = element(by.id('Registrar'));

  navegarParaCadastro() {
    this.navegarViaUrl('/conta/cadastro');
  }

  navegarParaCadastroPorLink() {
    this.navegarPorLink('Crie sua conta');
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaCadastroPorLink();
  }

  obterTituloCadastro() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-cadastro/div/h1').getText();
  }

  obterSubtituloCadastro() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-cadastro/div/form/h4').getText();
  }

  obterErroCampoEmail() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-cadastro/div/form/div[1]/div/span/p').getText();
  }

  obterErroCampoSenha() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-cadastro/div/form/div[2]/div/span/p').getText();
  }

  obterErroCampoSenhaConfirmacao() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-cadastro/div/form/div[3]/div/span/p').getText();
  }
}
