import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        BarComponent
    ],
    providers: [],
    exports: [
        BarComponent
    ]
})
export class BarModule {
    // fornece os providers conforme o método que é chamado
    static forRoot(config: BarUnidadeConfig): ModuleWithProviders {
        return {
            ngModule: BarModule,
            providers: [
                { provide: 'ConfigManualUnidade', useValue: config },
                { provide: BAR_UNIDADE_CONFIG, useValue: config }
            ]
        }
    }

    static forChild() { }
}