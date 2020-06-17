import { AppTodoPage } from './app.todo.po';
import { browser, logging } from 'protractor';

describe('Testes da lista de tarefas', () => {
  let page: AppTodoPage;

  beforeEach(() => {
    page = new AppTodoPage();
  });

  it('Deve navegar até Todo', () => {
    page.iniciarNavegacao();
    expect(page.obterTituloCardTarefas()).toEqual('Tarefas');
    expect(page.obterTituloCardIniciadas()).toEqual('Iniciadas');
    expect(page.obterTituloCardFinalizadas()).toEqual('Finalizadas');
  });

  it('Deve iniciar uma tarefa', () => {
    page.iniciarNavegacao();
    page.responderEmailIniciar.click();
    page.esperar();

    expect(page.obterTextoCardTarefasIniciadas()).toContain('Responder e-mails');
  });

  it('Deve retroceder uma tarefa', () => {
    page.iniciarNavegacao();
    page.responderEmailRetroceder.click();
    page.esperar();

    expect(page.obterTextoCardTarefas()).toContain('Responder e-mails');
  });

  it('Deve finalizar uma tarefa', () => {
    page.iniciarNavegacao();
    page.responderEmailIniciar.click();
    page.esperar();
    expect(page.obterTextoCardTarefasIniciadas()).toContain('Responder e-mails');

    page.responderEmailFinalizar.click();
    page.esperar();
    expect(page.obterTextoCardTarefasFinalizadas()).toContain('Responder e-mails');

    page.responderEmailCancelar.click();
    page.esperar();
    expect(page.obterTextoCardTarefasIniciadas()).toContain('Responder e-mails');

    page.responderEmailRetroceder.click();
    page.esperar();
    expect(page.obterTextoCardTarefas()).toContain('Responder e-mails');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
