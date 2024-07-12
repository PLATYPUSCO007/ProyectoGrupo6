import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: 'sesion',
  loadChildren: ()=>import('./login/login.module').then(m=>m.LoginModule),
},{
  path: 'plataforma',
  loadChildren: ()=>import('./plataforma/plataforma.module').then(m=>m.PlataformaModule),
  canActivate: [AuthGuard],
  canLoad: [AuthGuard]
},{
  path: '**',
  redirectTo: 'sesion'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
