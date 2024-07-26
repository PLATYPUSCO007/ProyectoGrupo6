import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoriasCurso, Curso } from '../../../../interfaces/Curso.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{

  public isCreate = signal<boolean>(true);
  public tempImg = signal<string | ArrayBuffer>('');
  public eventFile = signal<any>('');

  public listCategorias: CategoriasCurso[] = [
    CategoriasCurso['BASE DE DATOS'],
    CategoriasCurso['COMPUTACION EN LA NUBE'],
    CategoriasCurso['PROGRAMACION'],
    CategoriasCurso['SEGURIDAD']
  ];

  public keysCurso: (keyof Curso)[] = ['titulo', 'descripcion', 'duracion', 'imagen', 'categoria']

  private fb = inject(FormBuilder);
  public formCursos: FormGroup = this.fb.group({
    id: [''],
    titulo: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    duracion: ['', [Validators.required]],
    imagen: ['']
  })

  private cursoService = inject(CursoService);

  get listCursos(): Curso[]{
    return this.cursoService.listOfCursos;
  }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(){
    this.cursoService.getCursos()
      .subscribe({
        next: (result)=>{
          console.log(result);
        },
        error: (e)=>{
          console.error(e);
        }
      })
  }

  cargaImg(e: any){
    this.eventFile.update(()=>e);
  }

  crearCurso(){
    if (this.formCursos.invalid) return;
    console.log(this.formCursos.value);
    this.cursoService.postCurso(this.formCursos.value)
      .pipe(
        switchMap(()=>this.cursoService.getCursos())
      )
      .subscribe({
        next: (curso)=>{
          console.log(curso);
          this.formCursos.reset();
          this.formCursos.get('categoria')?.setValue('');
        },
        error: (e)=>{
          console.log(e);
        }
      });
  }

  editCurso(curso: Curso){
    const {_id, created_at, id_usuario, ...cursoVal} = curso;
    cursoVal.imagen = '';
    cursoVal.id = _id;
    this.formCursos.setValue(cursoVal);
    this.isCreate.update(()=>false);
  }

  updateCurso(){
    if (this.formCursos.invalid) return;
    this.cursoService.updateCursos(this.formCursos.value)
      .pipe(
        switchMap(()=>this.cursoService.getCursos())
      ).subscribe({
        next: (result)=>{
          console.log(result);
          this.isCreate.update(()=>true);
          this.formCursos.reset();
          this.formCursos.get('categoria')?.setValue('');
        },
        error: (e)=>{
          console.log(e);
        }
      })
  }
}
