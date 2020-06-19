import { AppCadastroPage } from './app.cadastro.po';
import { browser, logging } from 'protractor';

describe('Testes do formulário de cadastro', () => {
  let page: AppCadastroPage;

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

    page.campoEmail.sendKeys('teste@teste');
    page.campoSenha.sendKeys('Teste123');
    page.campoSenhaConfirmacao.sendKeys('Teste123');
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

    page.campoSenha.sendKeys('12345');
    page.campoSenhaConfirmacao.click();

    expect(page.obterErroCampoSenha()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a senha tem no máximo 15 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys(''.padEnd(16, 'A'));
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

    page.campoSenhaConfirmacao.sendKeys('12345');
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se a confirmação da senha tem no máximo 15 caracteres', () => {
    page.iniciarNavegacao();

    page.campoSenhaConfirmacao.sendKeys(''.padEnd(16, 'A'));
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('A senha deve possuir entre 6 e 15 caracteres');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  it('Deve validar se as senhas forem diferentes', () => {
    page.iniciarNavegacao();

    page.campoSenha.sendKeys('Teste123');
    page.campoSenhaConfirmacao.sendKeys('Teste122');
    page.campoSenha.click();

    expect(page.obterErroCampoSenhaConfirmacao()).toContain('As senhas não conferem');
    expect(page.botaoRegistrar.getAttribute('disabled')).toEqual('true');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
