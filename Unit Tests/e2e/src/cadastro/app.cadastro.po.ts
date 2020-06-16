import { browser } from 'protractor';

export class AppCadastroPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }
}
