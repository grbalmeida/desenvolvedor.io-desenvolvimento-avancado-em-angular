import { browser, logging } from 'protractor';
import { AppCadastroPage } from './app.cadastro.po';

describe('Testes do formulário de cadastro', () => {
    let page: AppCadastroPage;

    beforeEach(() => {
        page = new AppCadastroPage();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser

        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE
        } as logging.Entry
        ));
    });
});
