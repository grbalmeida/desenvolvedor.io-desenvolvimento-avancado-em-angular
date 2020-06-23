import { by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppLoginPage extends AppBasePage {

  constructor() {
    super();
  }

  campoEmail = element(by.id('email'));
  campoSenha = element(by.id('password'));
  campoSenhaConfirmacao = element(by.id('confirmPassword'));
  botaoLogin = element(by.id('Login'));
  botaoRegistrar = element(by.id('Registrar'));

  navegarParaCadastro() {
    this.navegarViaUrl('/conta/cadastro');
  }

  navegarParaLogin() {
    this.navegarViaUrl('/conta/login');
  }

  navegarParaLoginPorLink() {
    this.navegarPorLink('Entrar');
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaLoginPorLink();
  }

  obterTituloLogin() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-login/div/h1').getText();
  }

  obterSubtituloLogin() {
    return this.obterElementoXpath('/html/body/app-root/app-conta-root/app-login/div/form/h4').getText();
  }
}
