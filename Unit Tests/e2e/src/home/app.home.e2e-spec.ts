import { AppPage } from './app.home.po';
import { browser, logging } from 'protractor';

describe('Testes da página inicial', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Deve exibir uma mensagem na página inicial', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Desenvolvimento Avançado em Angular');
    });

    it('Deve exibir cards', () => {
        page.navigateTo();
        expect(page.getCardMultiplataforma()).toEqual('Multiplataforma');
        expect(page.getCardPerformance()).toEqual('Performance');
        expect(page.getCardProdutividade()).toEqual('Produtividade');
        expect(page.getCardFuncionalidades()).toEqual('Funcionalidades');
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
