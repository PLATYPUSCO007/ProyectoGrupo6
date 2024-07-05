import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { LoguinComponent } from './pages/loguin/loguin.component';
import { ActiveCodeComponent } from './pages/active-code/active-code.component';

const routes: Routes = [{
  path: '',
  component: LoginLayoutComponent,
  children: [{
    path: 'loguin',
    component: LoguinComponent
  },{
    path: 'active',
    component: ActiveCodeComponent
  },
  {
    path: '**',
    redirectTo: 'loguin'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
