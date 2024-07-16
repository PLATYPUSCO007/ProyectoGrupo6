import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Modulo} from '../../../../interfaces/Modulo.interface';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {

  public isCreate = signal<boolean>(false);

  public keysModule: (keyof Modulo)[] = ['titulo', 'duracion', 'material', 'video'];
  public listModulos: Modulo[] = [
    {
        titulo: "Introducción a JavaScript",
        duracion: 15,
        material: "PDF de referencia",
        video: "intro-js.mp4",
    },
    {
        titulo: "Fundamentos de HTML",
        duracion: 20,
        material: "Guía rápida de HTML"
    },
    {
        titulo: "CSS para Principiantes",
        duracion: 30,
        material: "Ejemplos de código",
        video: "css-basics.mp4",
    },
    {
        titulo: "Programación Asíncrona en JavaScript",
        duracion: 25,
        material: "Documentación de Promesas",
        video: "async-js.mp4",
    },
    {
        titulo: "Introducción a React",
        duracion: 40,
        material: "Manual de uso de React"
    }
];

  private fb = inject(FormBuilder);
  public formModule: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    duracion: ['', [Validators.required]],
    material: ['', [Validators.required]],
    video: ['', [Validators.required]],
  })

  updateModulo(){
    this.isCreate.update(()=>true);
    this.formModule.reset();
  }

  editModulo(e: Modulo){
    const moduloEdit = {...e};
    moduloEdit.video = '';
    this.formModule.setValue(moduloEdit);
    this.isCreate.update(()=>false);
  }
}
