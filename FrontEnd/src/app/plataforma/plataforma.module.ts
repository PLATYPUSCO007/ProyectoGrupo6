import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { LayoutPlataformaComponent } from './layout/layout-plataforma/layout-plataforma.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { EstudiantesPageComponent } from './pages/estudiantes-page/estudiantes-page.component';
import { SupervisoresPageComponent } from './pages/supervisores-page/supervisores-page.component';
import { TutoresPageComponent } from './pages/tutores-page/tutores-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuComponent } from '../components/menu.component';
import { CardComponent } from './components/card/card.component';
import { EstudiantesComponent } from './pages/supervisor/estudiantes/estudiantes.component';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { CodigoActivacionDirective } from './directives/codigo-activacion.directive';
import { CursosComponent } from './pages/supervisor/cursos/cursos.component';
import { DashboardsComponent } from './pages/supervisor/dashboards/dashboards.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LayoutPlataformaComponent,
    CursosPageComponent,
    EstudiantesPageComponent,
    SupervisoresPageComponent,
    TutoresPageComponent,
    HomePageComponent,
    CardComponent,
    EstudiantesComponent,
    SideMenuComponent,
    CodigoActivacionDirective,
    CursosComponent,
    DashboardsComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
  ]
})
export class PlataformaModule { }
