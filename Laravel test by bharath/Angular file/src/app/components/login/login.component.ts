import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
  });
  formSubmitted: boolean = false;

  constructor(public http: HttpClient, public route: Router) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/login']);
    } else {
      route.navigate(['/dashboard']);
    }
  }

  login(): any {
    this.formSubmitted = true;
    console.log(this.loginFormGroup.get('email')?.errors);
    if (this.loginFormGroup.invalid) {
      return false;
    }
    this.http
      .post<any>(environment.url + 'login', this.loginFormGroup.value)
      .subscribe(
        (data) => {
          if (data.user) {
            Swal.fire({
              icon: 'success',

              text: data.message,
            });
            localStorage.setItem('token', data.token);
            this.route.navigate(['/dashboard']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message,
            });
          }
          console.log(data);
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          });
        }
      );
  }

  isFieldInvalid(field: string) {
    return (
      this.loginFormGroup.get(field)?.invalid &&
      (this.loginFormGroup.get(field)?.touched ||
        this.loginFormGroup.get(field)?.dirty ||
        this.formSubmitted)
    );
  }

  getErrorMessage(field: string, label: string): string {
    let formControlErrors = this.loginFormGroup.get(field)?.errors;
    if (formControlErrors) {
      let firstError = Object.keys(
        this.loginFormGroup.get(field)?.errors as Object
      )[0];
      switch (firstError) {
        case 'required':
          return `${label} is required`;
        case 'minlength':
          return `${label} must be at least ${formControlErrors['minlength']?.requiredLength} characters`;
        case 'maxlength':
          return `${label} must be at most ${formControlErrors['maxlength']?.requiredLength} characters`;
      }
    }
    return '';
  }
}
