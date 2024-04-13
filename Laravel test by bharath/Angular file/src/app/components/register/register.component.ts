import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../services/rest-api.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(public http: HttpClient, public router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
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

  isFormSubmitted = false;

  register(): any {
    this.isFormSubmitted = true;
    this.http
      .post<any>(environment.url + 'register', this.form.value, {})
      .subscribe((data) => {
        if (data.user) {
          Swal.fire({
            icon: 'success',
            text: data.message,
          });
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
        console.log(data);
      });
  }

  isFieldInvalid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      (this.form.get(field)?.touched ||
        this.form.get(field)?.dirty ||
        this.isFormSubmitted)
    );
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError('required'))
      return `${label} is required`;
    if (this.form.get(field)?.hasError('minlength'))
      return `${label} should be at least ${
        this.form.get(field)?.getError('minlength').requiredLength
      } characters`;
    if (this.form.get(field)?.hasError('maxlength'))
      return `${label} should be at most ${
        this.form.get(field)?.getError('maxlength').requiredLength
      } characters`;

    return '';
  }
}
