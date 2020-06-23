import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

  constructor() {
    browser.driver.manage().window().maximize();
  }

  toastContainer = element(by.id('toast-container'));
  saudacaoUsuario = element(by.id('saudacaoUsuario'));
  botaoSair = element(by.xpath('/html/body/app-root/app-menu/header/nav/div/div/app-menu-login/ul/li[2]/a'));

  navegarParaHome() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navegarViaUrl(url: string) {
    return browser.get(url) as Promise<any>;
  }

  navegarPorLink(link: string) {
    browser.wait(ExpectedConditions.elementToBeClickable(element(by.linkText(link)))).then(() => {
      return element(by.linkText(link)).click();
    });
  }

  obterElementoXpath(xpath: string) {
    return element(by.xpath(xpath));
  }

  esperar = (milisegundos: number = 1000) => {
    browser.sleep(milisegundos);
  }
}
