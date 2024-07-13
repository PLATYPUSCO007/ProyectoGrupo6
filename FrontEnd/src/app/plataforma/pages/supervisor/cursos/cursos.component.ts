import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CategoriasCurso, Curso } from '../../../../interfaces/Curso.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent{

  public isCreate = signal<boolean>(true);
  public tempImg = signal<string | ArrayBuffer>('');

  public listCategorias: CategoriasCurso[] = [
    CategoriasCurso['BASE DE DATOS'],
    CategoriasCurso['COMPUTACION EN LA NUBE'],
    CategoriasCurso['PROGRAMACION'],
    CategoriasCurso['SEGURIDAD']
  ]

  public listCursos: Curso[] = [
    {
      titulo: "El Viaje Fantástico",
      descripcion: "Una aventura épica a través de tierras desconocidas y llenas de misterio.",
      duracion: 120,
      imagen: "logo.png",
      categoria: CategoriasCurso['BASE DE DATOS']
    },
    {
      titulo: "Cocina de Ensueño",
      descripcion: "Descubre recetas deliciosas y técnicas de cocina con los mejores chefs.",
      duracion: 45,
      imagen: "square.svg",
      categoria: CategoriasCurso['COMPUTACION EN LA NUBE']
    },
    {
      titulo: "Misterios del Espacio",
      descripcion: "Explora los secretos del universo y los misterios del espacio profundo.",
      duracion: 90,
      imagen: "square.svg",
      categoria: CategoriasCurso['PROGRAMACION']
    },
    {
      titulo: "Ritmos del Mundo",
      descripcion: "Un viaje musical a través de los diferentes ritmos y culturas del mundo.",
      duracion: 60,
      imagen: "square.svg",
      categoria: CategoriasCurso['SEGURIDAD']
    },
    {
      titulo: "Arte en Movimiento",
      descripcion: "Una mirada al fascinante mundo del arte contemporáneo y sus protagonistas.",
      duracion: 50,
      imagen: "square.svg",
      categoria: CategoriasCurso['BASE DE DATOS']
    }
  ];

  private fb = inject(FormBuilder);
  public formCursos: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    duracion: ['', [Validators.required]],
    imagen: ['', [Validators.required]]
  })

  cargaImg(e: any){
    const blob = e.target.files[0];
    const fileReader = new FileReader();
    let newImg: string | ArrayBuffer | null = '';
    fileReader.onload = function(e){
      if (!e) return;
      const imgUrl = e.target!.result;
      newImg = imgUrl;
      console.log(newImg);
    }
    fileReader.readAsDataURL(blob);
    setTimeout(() => {
      this.updateTempImg(newImg);
    }, 500);
  }

  updateTempImg(temp: string | ArrayBuffer | null){
    if (!temp) return;
    this.tempImg.update(()=>temp)
  }

  crearCurso(){
    if (this.formCursos.invalid) return;
    console.log(this.formCursos.value);
  }

  editCurso(curso: Curso){
    const cursoVal = {...curso};
    cursoVal.imagen = '';
    this.isCreate.update(()=>false);
    this.formCursos.setValue(cursoVal);
  }

  updateCurso(){
    this.isCreate.update(()=>true);
  }
}
