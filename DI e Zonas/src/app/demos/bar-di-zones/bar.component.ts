import { Component, OnInit, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BarServices, BarFactory } from './bar.service';
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        // { provide: BarServices, useClass: BarServices },
        {
            provide: BarServices,
            useFactory: BarFactory,
            deps: [
                HttpClient,
                Injector
            ]
        }
    ]
})
export class BarComponent implements OnInit {
    ConfigManual: BarUnidadeConfig;
    Config: BarUnidadeConfig;
    barBedida1: string;
    dadosUnidade: string;

    constructor(
        private barServices: BarServices,
        @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
        @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig
    ) { }

    ngOnInit(): void {
        this.barBedida1 = this.barServices.obterBebidas();
        this.ConfigManual = this.ApiConfigManual;
        this.Config = this.ApiConfig;

        this.dadosUnidade = this.barServices.obterUnidade();
    }
}