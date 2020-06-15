import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorComponent } from './contator.component';

describe('ContadorComponent', () => {
    let component: ContadorComponent;
    let fixture: ComponentFixture<ContadorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContadorComponent
            ]
        });

        fixture = TestBed.createComponent(ContadorComponent);
        component = fixture.componentInstance;

        component.valor = 0;
    });

    it('Deve incrementar corretamente', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
    });

    it('Deve decrementar corretamente', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
        component.decrementar();
        expect(component.valor).toBe(0);
    });

    it('Não deve decrementar abaixo do valor permitido', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
        component.decrementar();
        expect(component.valor).toBe(0);
        component.decrementar();
        expect(component.valor).toBe(0);
    });

    it('Não deve incrementar acima do valor permitido', () => {
        for (let i = 0; i < 200; i++) {
            component.incrementar();
        }

        expect(component.valor).toBe(100);
    });

    it('Deve incrementar ao apertar a seta para cima', () => {
        for (let i = 0; i < 50; i++) {
            const keyEvent = new KeyboardEvent('keyup', { code: 'ArrowUp' });
            component.onKeyUp(keyEvent);
        }

        expect(component.valor).toBe(50);
    });

    it('Deve incrementar ao apertar a seta para baixo', () => {
        for (let i = 0; i < 100; i++) {
            const keyEvent = new KeyboardEvent('keyup', { code: 'ArrowUp' });
            component.onKeyUp(keyEvent);
        }

        for (let i = 0; i < 20; i++) {
            const keyEvent = new KeyboardEvent('keyup', { code: 'ArrowDown' });
            component.onKeyUp(keyEvent);
        }

        expect(component.valor).toBe(80);
    });

    it('Deve manter o valor inalterado caso o código da tecla seja diferente de tecla para baixo ou para cima', () => {
        component.incrementar();
        expect(component.valor).toBe(1);

        let keyEvent = new KeyboardEvent('keyup', { code: 'ArrowLeft' });
        component.onKeyUp(keyEvent);
        expect(component.valor).toBe(1);

        keyEvent = new KeyboardEvent('keyup', { code: 'Space' });
        component.onKeyUp(keyEvent);
        expect(component.valor).toBe(1);
    });

    it('Deve colocar o foco no componente', () => {
        expect(component.foco).toBeFalsy();

        const focusEvent = new FocusEvent('focus');

        component.onFocus(focusEvent);

        expect(component.foco).toBeTruthy();
    });

    it('Deve tirar o foco do componente', () => {
        expect(component.foco).toBeFalsy();

        let focusEvent = new FocusEvent('focus');

        component.onFocus(focusEvent);

        expect(component.foco).toBeTruthy();

        focusEvent = new FocusEvent('blur');

        component.onBlur(focusEvent);

        expect(component.foco).toBeFalsy();
    });
});
