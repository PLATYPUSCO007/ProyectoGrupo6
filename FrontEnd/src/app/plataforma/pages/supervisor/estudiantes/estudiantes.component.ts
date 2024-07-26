import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Estado, Rol } from '../../../../interfaces/Roles.interface';
import { UserService } from '../../../services/user.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

  public keysUser: (keyof User)[] = ['cedula', 'name', 'last_name', 'telefono', 'email', 'rol', 'estado'];

  private newUser: User = {
    cedula: '',
    name: '',
    last_name: '',
    telefono: '',
    email: '',
    password: '',
    rol: Rol.ESTUDIANTE,
    estado: Estado.ACTIVO,
  }

  public isEdit = signal(false);

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  public formUser: FormGroup = this.fb.group({
    'id': [''],
    'cedula': ['', [Validators.required]],
    'name': ['', [Validators.required]],
    'last_name': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': [''],
    'rol': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
  });

  public estadoUser: Estado[] = [Estado.ACTIVO, Estado.INACTIVO];
  public rolUser: Rol[] = [Rol.ESTUDIANTE, Rol.SUPERVISOR, Rol.TUTOR];

  get listUsers(): User[]{
    return this.userService.listUser;
  }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers(){
    this.userService.getUsers()
      .subscribe({
        next: (users)=>{
          this.userService.listUser = users;
        },
        error: (e)=>{
          console.log(e);
        }
      });
  }

  createUser(){
    if (this.formUser.invalid) return;
    const user = this.formUser.value;
    // this.newUser = {...user};

    this.userService.createUser(user)
      .pipe(
        switchMap(()=>this.userService.getUsers())
      ).subscribe({
        next: (users)=>{
          this.resetForm();
          this.userService.listUser = users;
        },
        error: (e)=>{
          console.log(e);
        }
      })
  }

  sendEditUser(){
    if (this.formUser.invalid) return;
    this.userService.updateUser(this.formUser.value)
      .pipe(
        switchMap(()=>this.userService.getUsers())
      ).subscribe({
        next: (users)=>{
          this.userService.listUser = users;
          this.isEdit.update(()=>false);
          this.resetForm();
        },
        error: (e)=>{
          console.error(e);
        }
      })
  }

  editUser(user: User){
    const {_id, id_curso, created_at, ...editUser} = user;
    editUser.password = '';
    this.formUser.setValue(editUser);
    this.isEdit.update(()=>true);
  }

  deleteUser(){
    
  }

  resetForm(){
    this.formUser.reset({'estado': '', 'rol': ''});
  }
}
