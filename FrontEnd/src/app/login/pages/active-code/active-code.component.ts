import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-active-code',
  templateUrl: './active-code.component.html',
  styleUrl: './active-code.component.css'
})
export class ActiveCodeComponent{

  @ViewChild('code') codeActivate?: ElementRef | null;

  constructor(){
  }

  sendCode(){
    const codeToActive = this.codeActivate?.nativeElement.value;
    if (!codeToActive) return;
    console.log(this.codeActivate!.nativeElement.value);
  }
}
