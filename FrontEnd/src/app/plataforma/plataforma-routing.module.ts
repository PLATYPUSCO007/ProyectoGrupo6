import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPlataformaComponent } from './layout/layout-plataforma/layout-plataforma.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { EstudiantesPageComponent } from './pages/estudiantes-page/estudiantes-page.component';
import { SupervisoresPageComponent } from './pages/supervisores-page/supervisores-page.component';
import { TutoresPageComponent } from './pages/tutores-page/tutores-page.component';
import { EstudiantesComponent } from './pages/supervisor/estudiantes/estudiantes.component';
import { CursosComponent } from './pages/supervisor/cursos/cursos.component';
import { DashboardsComponent } from './pages/supervisor/dashboards/dashboards.component';

import {ProfileGuard} from '../guards/profile.guard';

const routes: Routes = [{
  path: '',
  component: LayoutPlataformaComponent,
  children: [{
    path: 'home',
    component: HomePageComponent
  },{
    path: 'cursos',
    component: CursosPageComponent
  },{
    path: 'estudiantes',
    component: EstudiantesPageComponent
  },{
    path: 'supervisor',
    component: SupervisoresPageComponent,
    canActivate: [ProfileGuard],
    data: {profile: 'Ricardo'},
    children: [{
      path: 'crudEstudiantes',
      component: EstudiantesComponent
    },{
      path: 'crudCursos',
      component: CursosComponent
    },{
      path: 'dashboards',
      component: DashboardsComponent
    },{
      path: '**',
      redirectTo: 'crudEstudiantes'
    }]
  },{
    path: 'tutores',
    component: TutoresPageComponent,
    canActivate: [ProfileGuard],
    data: {profile: 'RicardoE'},
  },{
    path: '**',
    redirectTo: 'home'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
