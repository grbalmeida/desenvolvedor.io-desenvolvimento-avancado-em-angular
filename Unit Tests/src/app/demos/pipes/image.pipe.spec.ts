import { ImageFormaterPipe } from './image.pipe';

describe('ImageFormaterPipe', () => {
    describe('Teste Isolado', () => {
        const pipe = new ImageFormaterPipe();

        it('Deve conter a pasta assets no path se o caminho for igual a default', () => {
            expect(pipe.transform('teste.jpg', false, 'default')).toBe('/assets/teste.jpg');
        });

        it('Deve conter a pasta assets no path se o caminho não for passado', () => {
            expect(pipe.transform('teste.jpg', false)).toBe('/assets/teste.jpg');
        });

        it('Deve conter a pasta imagens no path', () => {
            expect(pipe.transform('teste.jpg', false, 'imagens')).toBe('/imagens/teste.jpg');
        });

        it('Deve conter a imagem semCapa.jpg se não for informada a imagem', () => {
            expect(pipe.transform('', true, 'default')).toBe('/assets/semCapa.jpg');
        });

        it('Deve conter apenas a imagem caso caminho seja igual igual a uma string vazia', () => {
            expect(pipe.transform('teste.jpg', false, '')).toBe('//teste.jpg');
        });
    });
});
