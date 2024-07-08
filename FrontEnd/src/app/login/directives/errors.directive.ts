import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

enum listErrors {
  'required' = 'Este valor es requerido.',
  'minlength' = 'Se requieren mínimo x caracteres.',
}

@Directive({
  selector: '[appErrors]'
})
export class ErrorsDirective implements OnChanges {

  @Input() errorField?:  ValidationErrors | null;
  @Input() isPristine?: boolean;

  constructor(private elementRef: ElementRef){
  }

  ngOnChanges(): void {
    this.changeError();
  }

  changeError(){
    console.log(this.errorField);
    
    if (!this.errorField || this.isPristine) {
      this.elementRef.nativeElement.innerText = '';
      return;
    }

    const keys = Object.keys(this.errorField);
    const msg = (keys[0] === 'minlength') ? listErrors[keys[0] as keyof typeof listErrors].replace('x', this.errorField['minlength'].requiredLength) : listErrors[keys[0] as keyof typeof listErrors];
    this.elementRef.nativeElement.innerText = msg;
  }


}
