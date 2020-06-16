import { browser, element, by } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(by.xpath('/html/body/app-root/app-home/header/div/div/div[2]/h1')).getText() as Promise<string>;
    }

    getCardMultiplataforma() {
        return element(by.xpath('/html/body/app-root/app-home/div/div/div[1]/div/div[1]/h4')).getText() as Promise<string>;
    }

    getCardPerformance() {
        return element(by.xpath('/html/body/app-root/app-home/div/div/div[2]/div/div[1]/h4')).getText() as Promise<string>;
    }

    getCardProdutividade() {
        return element(by.xpath('/html/body/app-root/app-home/div/div/div[3]/div/div[1]/h4')).getText() as Promise<string>;
    }

    getCardFuncionalidades() {
        return element(by.xpath('/html/body/app-root/app-home/div/div/div[4]/div/div[1]/h4')).getText() as Promise<string>;
    }
}
