import { Component } from '@angular/core';
import { Menu } from '../../../interfaces/Menu.interface';

@Component({
  selector: 'app-supervisores-page',
  templateUrl: './supervisores-page.component.html',
  styleUrl: './supervisores-page.component.css'
})
export class SupervisoresPageComponent {

  public menuSupervisor: Menu[] = [
    {
      title: 'Estudiantes',
      route: '/plataforma/supervisor/crudEstudiantes'
    },
    {
      title: 'Paquetes',
      route: '/plataforma/supervisor/crudPaquetes'
    },
    {
      title: 'Cursos',
      route: '/plataforma/supervisor/crudCursos'
    },
    {
      title: 'Modulos',
      route: '/plataforma/supervisor/crudModulos'
    },
    {
      title: 'Dashboards',
      route: '/plataforma/supervisor/dashboards'
    },
  ]
}
