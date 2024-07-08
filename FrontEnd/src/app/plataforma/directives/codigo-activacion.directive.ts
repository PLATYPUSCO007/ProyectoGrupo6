import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCodigoActivacion]'
})
export class CodigoActivacionDirective implements AfterViewInit{

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.setValueCode();
  }

  setValueCode(){
    this.element.nativeElement.value = this.generateCode();
  }

  generateCode(){
    return `MAT-${Date.now()}`;
  }



}
