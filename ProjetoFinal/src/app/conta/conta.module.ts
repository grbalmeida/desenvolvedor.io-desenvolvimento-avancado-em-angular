import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomFormsModule } from 'ngx-custom-validators';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaRoutingModule } from './conta.route';
import { ContaAppComponent } from './conta.app.component';
import { ContaService } from './services/conta.service';
import { ContaGuard } from './services/conta.guard';

@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContaRoutingModule,
    CustomFormsModule
  ],
  providers: [
    ContaService,
    ContaGuard
  ]
})
export class ContaModule { }
