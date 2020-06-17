import { logging, browser } from 'protractor';
import { AppContadorPage } from './app.contador.po';

describe('Testes do contador', () => {
    let page: AppContadorPage;

    beforeEach(() => {
      page = new AppContadorPage();
    });

    it('Deve navegar para a página do contador', () => {
        page.iniciarNavegacao();
        expect(page.obterTituloContador()).toEqual('Contador');
    });

    it('Deve incrementar o contador', () => {
        page.iniciarNavegacao();

        for (let i = 0; i < 20; i++) {
            page.campoIncrementar.click();
        }

        expect(page.campoValor.getText()).toContain('20');
    });

    it('Deve decrementar o contador', () => {
        page.iniciarNavegacao();

        for (let i = 0; i < 20; i++) {
            page.campoIncrementar.click();
        }

        for (let i = 0; i < 15; i++) {
            page.campoDecrementar.click();
        }

        expect(page.campoValor.getText()).toContain('5');
    });

    it('Não deve decrementar abaixo do valor permitido', () => {
        page.iniciarNavegacao();

        page.campoIncrementar.click();
        expect(page.campoValor.getText()).toContain('1');
        page.campoDecrementar.click();
        expect(page.campoValor.getText()).toContain('0');
        page.campoDecrementar.click();
        expect(page.campoValor.getText()).toContain('0');
    });

    it('Não deve incrementar acima do valor permitido', () => {
        page.iniciarNavegacao();

        for (let i = 0; i < 105; i++) {
            page.campoIncrementar.click();
        }

        expect(page.campoValor.getText()).toContain('100');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
