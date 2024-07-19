import { Component, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { LoginService } from '../login/services/loginService/login.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/Roles.interface';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Menu } from '../interfaces/Menu.interface';

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
      icon: 'bi bi-house-door-fill me-3',
    },
    {
      route: 'cursos',
      title: 'Cursos',
      icon: 'bi bi bi-book-half me-3',
    },
    {
      route: 'estudiantes',
      title: 'Estudiantes',
      icon: 'bi bi-mortarboard-fill me-3'
    },
    {
      route: 'supervisor',
      title: 'Supervisores',
      icon: 'bi bi-eye-fill me-3',
      profile: 'Ricardo'
    },
    {
      route: 'tutores',
      title: 'Tutores',
      icon: 'bi bi-rocket-takeoff-fill me-3',
      profile: 'RicardoE'
    },
  ];

  @ViewChild('toastLoguin')
  public toastLoguin?: SwalComponent;

  public user = signal<User | null >(null);
  public completeName = computed(()=> `${this.user()?.name} ${this.user()?.last_name}`);
  public effectLoguin = effect(()=>{
    Swal.fire({
      title: 'SESION INICIADA',
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      position: "top",
      icon: "success",
      text: `Bienvenido ${this.user()?.name} ${this.user()?.last_name}`,
    })
  });

  private loginService = inject(LoginService);
  private router = inject(Router);


  get UserLogued(){
    return this.loginService.userSession;
  }

  constructor(){
    this.user.update(()=>this.UserLogued);
  }

  closeSession(){
    this.loginService.logOut()
      .subscribe({
        next: ()=>{
          this.router.navigateByUrl('/sesion/loguin');
        },
        error: (e)=>{
          console.log(`Error al cerrar sesion, ${e}`);
        }
      })
  }
}
