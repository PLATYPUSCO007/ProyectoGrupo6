import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPlataformaComponent } from './layout/layout-plataforma/layout-plataforma.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { EstudiantesPageComponent } from './pages/estudiantes-page/estudiantes-page.component';
import { SupervisoresPageComponent } from './pages/supervisores-page/supervisores-page.component';
import { TutoresPageComponent } from './pages/tutores-page/tutores-page.component';

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
    component: SupervisoresPageComponent
  },{
    path: 'tutores',
    component: TutoresPageComponent
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
