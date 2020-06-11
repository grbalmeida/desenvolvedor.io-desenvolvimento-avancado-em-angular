import { Component, OnInit, Inject } from '@angular/core';
import { BarServices } from './bar.service';
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        { provide: BarServices, useClass: BarServices }
    ]
})
export class BarComponent implements OnInit {
    ConfigManual: BarUnidadeConfig;
    Config: BarUnidadeConfig;
    barBedida1: string;

    constructor(
        private barServices: BarServices,
        @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
        @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig
    ) {
        this.ConfigManual = this.ApiConfigManual;
        this.Config = this.ApiConfig;
    }

    ngOnInit(): void {
        this.barBedida1 = this.barServices.obterBebidas();
    }
}