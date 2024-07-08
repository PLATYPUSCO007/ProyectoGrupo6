import { Component } from '@angular/core';
import { Curso } from '../../interfaces/Curso.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

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
  ];

}
