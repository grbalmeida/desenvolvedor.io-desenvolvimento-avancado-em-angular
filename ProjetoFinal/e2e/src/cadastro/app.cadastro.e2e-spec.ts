import * as faker from 'faker';

import { AppCadastroPage } from './app.cadastro.po';

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

    page.iniciarNavegacao();

    page.campoEmail.sendKeys(email);
    page.campoSenha.sendKeys(senha);
    page.campoSenhaConfirmacao.sendKeys(senha);
    page.botaoRegistrar.click();
    page.esperar(3000);

    expect(page.obterMensagemRetorno()).toContain(mensagemRetorno);
    expect(page.obterErrosServidor()).toContain(`Login '${email}' já está sendo utilizado.`);
  });
});
