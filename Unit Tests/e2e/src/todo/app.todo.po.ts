import { AppBasePage } from '../app.base.po';

export class AppTodoPage extends AppBasePage {
    constructor() {
        super();
    }

    responderEmailIniciar = this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks/div/todo-list/div/table/tbody/tr[1]/td/span[2]');
    responderEmailRetroceder = this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-iniciadas/div/todo-list/div/table/tbody/tr/td/span[3]');
    responderEmailFinalizar = this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-iniciadas/div/todo-list/div/table/tbody/tr/td/span[2]');
    responderEmailCancelar = this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-finalizadas/div/todo-list/div/table/tbody/tr/td/span[2]');

    navegarParaTodo() {
        this.navegarViaUrl('/todo');
    }

    navegarParaTodoPorLink() {
        this.navegarPorLink('To Do');
    }

    iniciarNavegacao() {
        this.navegarParaHome();
        this.navegarParaTodoPorLink();
    }

    obterTituloCardTarefas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks/div/todo-list/div/h3').getText();
    }

    obterTituloCardIniciadas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-iniciadas/div/todo-list/div/h3').getText();
    }

    obterTituloCardFinalizadas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-finalizadas/div/todo-list/div/h3').getText();
    }

    obterTextoCardTarefas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks').getText();
    }

    obterTextoCardTarefasIniciadas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-iniciadas').getText();
    }

    obterTextoCardTarefasFinalizadas() {
        return this.obterElementoXpath('/html/body/app-root/app-todo-list/div/div/tasks-finalizadas').getText();
    }
}
