import { Component, OnInit } from '@angular/core';
import { BarServices, BarServicesMock } from './bar.service';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        { provide: BarServices, useClass: BarServicesMock }
    ]
})
export class BarComponent implements OnInit {
    barBedida1: string;

    constructor(private barServices: BarServices) { }

    ngOnInit(): void {
        this.barBedida1 = this.barServices.obterBebidas();
    }
}