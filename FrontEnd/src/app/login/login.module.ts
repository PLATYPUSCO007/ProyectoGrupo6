import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { LoguinComponent } from './pages/loguin/loguin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsDirective } from './directives/errors.directive';
import { ActiveCodeComponent } from './pages/active-code/active-code.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LoginLayoutComponent,
    LoguinComponent,
    ErrorsDirective,
    ActiveCodeComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
  ]
})
export class LoginModule { }
