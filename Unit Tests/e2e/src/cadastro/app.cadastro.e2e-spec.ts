import { AppCadastroPage } from './app.cadastro.po';
import { browser, logging } from 'protractor';

describe('Testes do formulário de cadastro', () => {
  let page: AppCadastroPage;

  beforeEach(() => {
    page = new AppCadastroPage();
  });

  it('Deve navegar até formulário de cadastro', () => {
    page.iniciarNavegacao();
    expect(page.obterTituloCadastro()).toEqual('Demo Cadastro');
  });

  it('Deve preencher formulário de cadastro com sucesso', () => {
    page.campoNome.sendKeys('Eduardo Pires');
    page.campoCPF.sendKeys('30390600822');
    page.campoEmail.sendKeys('teste@teste.com');
    page.campoSenha.sendKeys('Teste@123');
    page.campoSenhaConfirmacao.sendKeys('Teste@123');

    browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(() => {
        browser.actions().mouseMove(page.botaoRegistrar).click().perform();
        page.esperar(1000);
        expect(page.obterResultadoCadastro()).toContain('"nome":"Eduardo Pires"');
    });
  });

  it('Deve validar se o nome foi preenchido', () => {
    page.iniciarNavegacao();

    page.campoNome.sendKeys('');
    page.campoCPF.click();

    expect(page.obterErroCampoNome()).toContain('O Nome é requerido');
  });

  it('Deve validar se o nome tem pelo menos 2 caracteres', () => {
    page.iniciarNavegacao();

    page.campoNome.sendKeys('A');
    page.campoCPF.click();

    expect(page.obterErroCampoNome()).toContain('O Nome precisa ter no mínimo 2 caracteres');
  });

  it('Deve validar se o nome tem mais do que 150 caracteres', () => {
    page.iniciarNavegacao();

    page.campoNome.sendKeys(''.padEnd(151, 'A'));
    page.campoCPF.click();

    expect(page.obterErroCampoNome()).toContain('O Nome precisa ter no máximo 150 caracteres');
  });

  it('Deve validar se o CPF foi preenchido', () => {
    page.iniciarNavegacao();

    page.campoCPF.sendKeys('');
    page.campoNome.click();

    expect(page.obterErroCampoCPF()).toContain('Informe o CPF');
  });

  it('Deve validar se o CPF é válido', () => {
    page.iniciarNavegacao();

    page.campoCPF.sendKeys('11111111111');
    page.campoNome.click();

    expect(page.obterErroCampoCPF()).toContain('CPF em formato inválido');
  });

  it('Deve validar se o e-mail foi preenchido', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys('');
    page.campoSenha.click();

    expect(page.obterErroCampoEmail()).toContain('Informe o e-mail');
  });

  it('Deve validar se o e-mail é válido', () => {
    page.iniciarNavegacao();

    page.campoEmail.sendKeys('teste');
    page.campoSenha.click();

    expect(page.obterErroCampoEmail()).toContain('E-mail inválido');
  });

  it('Deve validar senhas diferentes', () => {
    page.iniciarNavegacao();

    page.campoNome.sendKeys('Eduardo Pires');
    page.campoCPF.sendKeys('30390600822');
    page.campoEmail.sendKeys('teste@teste.com');
    page.campoSenha.sendKeys('Teste@2123');
    page.campoSenhaConfirmacao.sendKeys('Teste@123');

    page.campoSenha.click();

    expect(page.obterErroSenha()).toContain('As senhas não conferem');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
