import { by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {

  constructor() {
    super();
  }

  campoNome = element(by.id('nome'));
  campoCPF = element(by.id('cpf'));
  campoEmail = element(by.id('email'));
  campoSenha = element(by.id('senha'));
  campoSenhaConfirmacao = element(by.id('senhaConfirmacao'));

  botaoRegistrar = element(by.id('Registrar'));

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

  obterResultadoCadastro() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[7]/div/p[4]').getText();
  }

  obterErroCampoNome() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[1]/div/span').getText();
  }

  obterErroCampoCPF() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[2]/div/span').getText();
  }

  obterErroCampoEmail() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[3]/div/span').getText();
  }

  obterErroSenha() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[5]/div/span').getText();
  }
}
