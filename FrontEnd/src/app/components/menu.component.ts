import { Component, computed, signal } from '@angular/core';

interface Menu {
  route: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  public menuArray: Menu[] = [
    {
      route: 'home',
      title: 'Inicio',
      icon: 'bi bi-house-door-fill me-3'
    },
    {
      route: 'cursos',
      title: 'Cursos',
      icon: 'bi bi bi-book-half me-3'
    },
    {
      route: 'estudiantes',
      title: 'Estudiantes',
      icon: 'bi bi-mortarboard-fill me-3'
    },
    {
      route: 'supervisor',
      title: 'Supervisores',
      icon: 'bi bi-eye-fill me-3'
    },
    {
      route: 'tutores',
      title: 'Tutores',
      icon: 'bi bi-rocket-takeoff-fill me-3'
    },
  ];

  public user = signal({
    name: 'Pedro',
    lastName: 'Perez',
    role: 'Estudiante'
  });

  public completeName = computed(()=> `${this.user().name} ${this.user().lastName}`)
}
