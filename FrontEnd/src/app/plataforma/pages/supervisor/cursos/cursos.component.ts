import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CategoriasCurso, Curso } from '../../../../interfaces/Curso.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { of, switchMap, tap } from 'rxjs';
import { Estado, User } from '../../../../interfaces/Roles.interface';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{

  public isCreate = signal<boolean>(true);
  public imgToLoad: File | null = null;
  public eventFile = signal<Event | null>(null);

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
  public setValueImg = effect(()=>{
    if (!this.eventFile()) {
      return;
    }
    const input = this.eventFile()!.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imgToLoad = input.files![0];
    }
  })

  get listCursos(): Curso[]{
    return this.cursoService.listOfCursos;
  }

  ngOnInit(): void {
    this.getCursos();
  }

  getFiles(){
    this.listCursos.forEach((curso)=>{
      this.cursoService.getImgCurso(curso.imagen)
        .subscribe({
          next: (img)=>{
            curso.imagen = URL.createObjectURL(img);
          },
          error: (e)=>{
            console.log(e);
          }    
        })
    })
  }

  getCursos(){
    this.cursoService.getCursos()
      .subscribe({
        next: (result)=>{
          this.getFiles();
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
    this.cursoService.postCurso(this.formCursos.value)
      .pipe(
        tap((curso)=>console.log(curso)),
        switchMap((curso)=> {
          return (this.imgToLoad) ? this.cursoService.upImgCurso(curso.id!, this.imgToLoad) : of('');
        }),
        switchMap(()=>this.cursoService.getCursos())
      )
      .subscribe({
        next: (curso)=>{
          this.formCursos.reset();
          this.formCursos.get('categoria')?.setValue('');
          this.getFiles();
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
        tap(()=>console.log(this.formCursos.get('imagen'))),
        switchMap(()=> {
          return (this.imgToLoad) ? this.cursoService.upImgCurso(this.formCursos.get('id')!.value, this.imgToLoad) : of('');
        }),
        switchMap(()=>this.cursoService.getCursos())
      ).subscribe({
        next: (result)=>{
          this.getFiles();
          this.isCreate.update(()=>true);
          this.formCursos.reset();
          this.formCursos.get('categoria')?.setValue('');
          this.imgToLoad = null;
        },
        error: (e)=>{
          console.log(e);
        }
      })
  }
}
