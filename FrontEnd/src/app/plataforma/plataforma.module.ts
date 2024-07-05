import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { LayoutPlataformaComponent } from './layout/layout-plataforma/layout-plataforma.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { EstudiantesPageComponent } from './pages/estudiantes-page/estudiantes-page.component';
import { SupervisoresPageComponent } from './pages/supervisores-page/supervisores-page.component';
import { TutoresPageComponent } from './pages/tutores-page/tutores-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuComponent } from '../components/menu.component';


@NgModule({
  declarations: [
    LayoutPlataformaComponent,
    CursosPageComponent,
    EstudiantesPageComponent,
    SupervisoresPageComponent,
    TutoresPageComponent,
    HomePageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule
  ]
})
export class PlataformaModule { }
