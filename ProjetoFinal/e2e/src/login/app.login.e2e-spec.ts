import * as faker from 'faker';

import { AppLoginPage } from './app.login.po';

describe('Testes do login', () => {
  let page: AppLoginPage;
  let email: string;
  const senha = 'Teste@123';

  beforeEach(() => {
    page = new AppLoginPage();
  });

  it('Deve navegar até a página de login', () => {
    page.iniciarNavegacao();

    expect(page.obterTituloLogin()).toContain('Login');
    expect(page.obterSubtituloLogin()).toContain('Entre na sua conta');
  });

  it('Deve cadastrar um usuário para realizar o login', () => {
    page.navegarParaCadastro();

    email = faker.internet.email();

    page.campoEmail.sendKeys(email);
    page.campoSenha.sendKeys(senha);
    page.campoSenhaConfirmacao.sendKeys(senha);
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.saudacaoUsuario.getText()).toContain(email);

    page.toastContainer.click();
    page.esperar();
    page.botaoSair.click();
    page.esperar();
  });

  it('Deve logar', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(email);
    page.campoSenha.sendKeys(senha);
    page.botaoLogin.click();
    page.esperar(3000);

    expect(page.saudacaoUsuario.getText()).toContain(email);

    page.toastContainer.click();
    page.esperar();
    page.botaoSair.click();
    page.esperar();
  });
});
