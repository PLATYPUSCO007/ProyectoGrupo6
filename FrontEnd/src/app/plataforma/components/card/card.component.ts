import { Component, Input } from '@angular/core';
import { Curso } from '../../interfaces/Curso.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input()
  img: string = '';

  @Input()
  title: string = '';

  @Input()
  description: string = '';

  // Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
  
  @Input()
  isRegistered: boolean = false;

  @Input()
  curso: Curso = {
    description: '',
    img: '',
    title: ''
  };

}
