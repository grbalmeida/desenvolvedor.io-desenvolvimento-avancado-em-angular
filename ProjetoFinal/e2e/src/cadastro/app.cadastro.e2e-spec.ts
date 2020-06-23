import * as faker from 'faker';

import { AppCadastroPage } from './app.cadastro.po';
import { browser } from 'protractor';

describe('Testes do formulário de cadastro', () => {
  let page: AppCadastroPage;
  const mensagemRetorno = 'Opa! Alguma coisa não deu certo:';

  beforeEach(() => {
    page = new AppCadastroPage();
  });

  it('Deve navegar até formulário de cadastro', () => {
    page.iniciarNavegacao();

    expect(page.obterTituloCadastro()).toEqual('Cadastro');
    expect(page.obterSubtituloCadastro()).toEqual('Crie sua conta');
  });

  it('Deve preencher formulário de cadastro com sucesso', () => {
    page.iniciarNavegacao();

    const senha = faker.internet.password(8);

    page.campoEmail.sendKeys(faker.internet.email());
    page.campoSenha.sendKeys(senha);
    page.campoSenhaConfirmacao.sendKeys(senha);
    page.campoEmail.click();

    expect(page.botaoRegistrar.getAttribute('disabled')).toBeFalsy();
  });

  it('Deve validar se o e-mail foi preenchido', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys('');
    page.campoSenha.click();

    expect(page.obterErroCampoEmail()).toContain('Informe o e-mail');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se o e-mail está no formato correto', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys('teste');
    page.campoSenha.click();

    expect(page.obterErroCampoEmail()).toContain('Email inválido');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a senha foi preenchida', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys('');
    page.campoSenhaConfirmacao.click();

    expect(page.obterErroCampoSenha()).toContain('Informe a senha');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a senha tem pelo menos 6 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys(faker.internet.password(5));
    page.campoSenhaConfirmacao.click();

    expect(page.obterErroCampoSenha()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a senha tem no máximo 15 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys(faker.internet.password(16));
    page.campoSenhaConfirmacao.click();

    expect(page.obterErroCampoSenha()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a confirmação da senha foi preenchida', () => {
    page.iniciarNavegacao();

    page.campoSenhaConfirmacao.sendKeys('');
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('Informe a senha novamente');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a confirmação da senha tem pelo menos 6 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenhaConfirmacao.sendKeys(faker.internet.password(5));
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a confirmação da senha tem no máximo 15 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenhaConfirmacao.sendKeys(faker.internet.password(16));
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se as senhas forem diferentes', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys(faker.internet.password(8));
    page.campoSenhaConfirmacao.sendKeys(faker.internet.password(9));
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('As senhas não conferem');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a senha possui pelo menos um digíto', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(faker.internet.email());
    page.campoSenha.sendKeys('------');
    page.campoSenhaConfirmacao.sendKeys('------');
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain('Senhas devem conter ao menos um digito (\'0\'-\'9\').');
    expect(page.toastContainer.getText()).toContain('Ocorreu um erro!');
  });

  it('Deve validar se a senha possui pelo menos um caracter não alfanumérico', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(faker.internet.email());
    page.campoSenha.sendKeys('teste123');
    page.campoSenhaConfirmacao.sendKeys('teste123');
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain('Senhas devem conter ao menos um caracter não alfanumérico.');
    expect(page.toastContainer.getText()).toContain('Ocorreu um erro!');
  });

  it('Deve validar se a senha possui pelo menos um caracter em caixa baixa', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(faker.internet.email());
    page.campoSenha.sendKeys('TESTE123');
    page.campoSenhaConfirmacao.sendKeys('TESTE123');
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain('Senhas devem conter ao menos um caracter em caixa baixa (\'a\'-\'z\').');
    expect(page.toastContainer.getText()).toContain('Ocorreu um erro!');
  });

  it('Deve validar se a senha possui pelo menos um caracter em caixa alta', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(faker.internet.email());
    page.campoSenha.sendKeys('teste123');
    page.campoSenhaConfirmacao.sendKeys('teste123');
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain('Senhas devem conter ao menos um caracter em caixa alta (\'A\'-\'Z\').');
    expect(page.toastContainer.getText()).toContain('Ocorreu um erro!');
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    page.iniciarNavegacao();

    const email = faker.internet.email();
    const senha = 'Teste@123';

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

  it('Deve validar se o e-mail já está sendo usado', () => {
    page.iniciarNavegacao();

    const email = faker.internet.email();
    const senha = 'Teste@123';

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
    page.iniciarNavegacao();

    page.campoEmail.sendKeys(email);
    page.campoSenha.sendKeys(senha);
    page.campoSenhaConfirmacao.sendKeys(senha);
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain(`Login '${email}' já está sendo utilizado.`);
    expect(page.toastContainer.getText()).toContain('Ocorreu um erro!');
  });

  it('Deve navegar para home se estiver logado e tentar acessar o cadastro ou o login', () => {
    page.iniciarNavegacao();

    const email = faker.internet.email();
    const senha = 'Teste@123';

    page.campoEmail.sendKeys(email);
    page.campoSenha.sendKeys(senha);
    page.campoSenhaConfirmacao.sendKeys(senha);
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.saudacaoUsuario.getText()).toContain(email);

    browser.get(`${browser.baseUrl}conta/cadastro`);
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}home`);

    browser.get(`${browser.baseUrl}conta/login`);
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}home`);

    page.botaoSair.click();
  });
});
