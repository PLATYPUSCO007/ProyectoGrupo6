import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/loginService/login.service';
import { delay, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.css'
})
export class LoguinComponent{

  private fb: FormBuilder = inject(FormBuilder);
  private loguinService = inject(LoginService);
  private router = inject(Router);

  constructor(){
    this.loguinService.isLogued()
      .subscribe(result=>{
        if (result) this.router.navigateByUrl('/plataforma');
      })
  }

  public formLoguin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  logUser(){
    if (this.formLoguin.invalid) return;
    this.formLoguin.disable();
    this.loguinService.logUser(this.formLoguin.value)
      .pipe(
        tap(()=>this.formLoguin.enable())
      )
      .subscribe({
        next: (user)=>{
          this.router.navigateByUrl('/plataforma')
        },
        error: (e)=>{
          this.formLoguin.enable();
          console.log(e);
        }
      })
  }
}
