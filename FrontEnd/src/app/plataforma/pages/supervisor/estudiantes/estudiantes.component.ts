import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado, Estudiante } from '../../../interfaces/Estudiante.interface';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

  private newEstudiante: Estudiante = {
    apellido: '',
    cedula: '',
    codigo_activacion: '',
    email: '',
    estado: Estado.REGISTRADO,
    matricula: '',
    nombre: '',
    supervisor: '',
    telefono: '',
  }

  public listEstudiantes: Estudiante[] = [
    {
      apellido: 'Rodriguez',
      cedula: '12312',
      codigo_activacion: '323424',
      email: 'rodrigo@sdfas.com',
      estado: Estado.REGISTRADO,
      matricula: 'MAT-423',
      nombre: 'Ramon',
      supervisor: 'Pepito',
      telefono: '431231',
    },
    {
      apellido: 'Rojas',
      cedula: '234234',
      codigo_activacion: '52342d',
      email: 'rojas@sdfs.com',
      estado: Estado.REGISTRADO,
      matricula: 'MAT-111',
      nombre: 'Filoberta',
      supervisor: 'Pepito',
      telefono: '213123',
    } 
  ]

  public isEdit = signal(false);

  private fb = inject(FormBuilder);
  public formEstudiante: FormGroup = this.fb.group({
    'cedula': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'apellido': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'matricula': [{value: `MAT-${Date.now()}`, disabled: true}, [Validators.required]],
    'codigo_activacion': [`${crypto.randomUUID()}`, [Validators.required]],
    'estado': ['', [Validators.required]],
    'supervisor': ['', [Validators.required]],
  });

  public estadoEstudiante: Estado[] = [Estado.ACTIVO, Estado.INACTIVO, Estado.REGISTRADO];

  createEstudiante(){
    this.formEstudiante.get('matricula')?.enable();
    const estudent = this.formEstudiante.value;
    this.newEstudiante = {...estudent};
    this.resetForm();
  }

  sendEditEstudiante(){
    this.isEdit.update(()=>false);
    this.resetForm();
  }

  editEstudiante(estudiante: Estudiante){
    this.formEstudiante.setValue(estudiante);
    this.isEdit.update(()=>true);
  }

  deleteEstudiante(){
    
  }

  resetForm(){
    this.formEstudiante.reset({'matricula': `MAT-${Date.now()}`, 'estado': '', 'supervisor': ''});
    this.formEstudiante.get('matricula')?.disable();
  }
}
