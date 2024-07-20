import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaPaquete, Paquete } from '../../../../interfaces/Paquete.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent {

  private paquete: Paquete = {
    titulo: '',
    descripcion: '',
    categoria: CategoriaPaquete['HABILIDADES BLANDAS'],
    imagen: '',
    cursos: [],
  };
  public keysPaquete: (keyof Paquete)[] = ['titulo', 'descripcion', 'categoria', 'imagen', 'cursos'];

  public listCategoriasPaquete: CategoriaPaquete[] = [
    CategoriaPaquete['HABILIDADES BLANDAS'],
    CategoriaPaquete['INGENIERIA'],
    CategoriaPaquete['MATEMATICAS'],
    CategoriaPaquete['RH']
  ]

  public listCursos: string[]= [
    '123331',
    '123111',
    '123123'
  ]

  public listPaquetes: Paquete[] = [
    {
      titulo: "Curso de Desarrollo Web",
      descripcion: "Aprende a crear sitios web desde cero con HTML, CSS y JavaScript.",
      categoria: CategoriaPaquete['HABILIDADES BLANDAS'],
      imagen: "square.svg",
      cursos: ["123331"]
  },
  {
      titulo: "Curso de Diseño Gráfico",
      descripcion: "Domina las herramientas y técnicas para crear impresionantes diseños gráficos.",
      categoria: CategoriaPaquete.INGENIERIA,
      imagen: "square.svg",
      cursos: ["123331", "123111"]
  },
  {
      titulo: "Curso de Marketing Digital",
      descripcion: "Aprende estrategias de marketing digital para aumentar la visibilidad y ventas online.",
      categoria: CategoriaPaquete.MATEMATICAS,
      imagen: "square.svg",
      cursos: ["123331", "123111", "123123"]
  }
  ]

  private fb = inject(FormBuilder);
  public formPaquete: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    cursos: [],
  });

  public isCreate = signal<boolean>(true);
  public eventFile = signal<any>('');

  constructor(){
  }

  cargaImg(e: any){
    this.eventFile.update(()=>e);
  }

  updatePaquete(){
    this.isCreate.update(()=>true);
    this.formPaquete.setValue(this.paquete);
  }

  editPaquete(e: Paquete){
    const paqueteEdit = {...e};
    paqueteEdit.imagen = '';
    this.formPaquete.setValue(paqueteEdit);
    this.isCreate.update(()=>false);
  }
}
