import { Component, inject, signal, ɵunwrapWritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from } from 'rxjs';
import { map, take, skip, delay, tap } from 'rxjs/operators'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})

export class LoginPage {
  authService = inject(AuthService)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit() {
    if(this.form.valid) {
      console.log(this.form.value);
      // @ts-ignore
      this.authService.login(this.form.value)
        .subscribe( res => {
          this.router.navigate(['']),
          console.log(res)
      })
    }
  }
  // onSubmit(event: Event) {
  //   console.log(event);
  // }
  // constructor() { // эксперемент с эмуляцией запросов
  //   from([1,2,3,4,5,6,7,8,9])
  //      .pipe(
  //       map(val => val * 2),
  //       take(2), // берет 1е два элемента
  //       skip(2), // пропускает 2 элемента
  //       delay(1000) // задержка в секунду
  //       tap(val => { // будет втыкать значение в input
  //         this.form.patchValue({username:val.toString()})
  //       })
  //     ).subscribe(val => {
  //       console.log(val);
  //     })
  // }
}
