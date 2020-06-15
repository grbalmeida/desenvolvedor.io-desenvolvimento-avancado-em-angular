import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const adminRouterConfig: Routes = [
    { path: '', component: AdminDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }