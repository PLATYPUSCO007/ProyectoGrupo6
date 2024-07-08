import { Component } from '@angular/core';
import { Curso } from '../../interfaces/Curso.interface';

@Component({
  selector: 'app-cursos-page',
  templateUrl: './cursos-page.component.html',
  styleUrl: './cursos-page.component.css'
})
export class CursosPageComponent {

  public cursos: Curso[] = [
    {
      img: './square.svg',
      title: 'Node JS',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    },
    {
      img: './square.svg',
      title: 'Node JS',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    },
    {
      img: './square.svg',
      title: 'Node JS',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    },
    {
      img: './square.svg',
      title: 'Node JS',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    },
  ];

}
