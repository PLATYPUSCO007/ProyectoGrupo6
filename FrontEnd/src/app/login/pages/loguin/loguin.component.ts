import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/loginService/login.service';
import { delay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.css'
})
export class LoguinComponent{

  @ViewChild('toastLoguin')
  public toastLoguin?: SwalComponent;

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
          this.toastLoguin!.fire();
          this.formLoguin.enable();
          console.log(e);
        }
      })
  }
}
