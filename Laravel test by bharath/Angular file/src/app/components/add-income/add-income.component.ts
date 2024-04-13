import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
import { RestApiService } from '../../services/rest-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    AngularEditorModule,
  ],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css',
})
export class AddIncomeComponent {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  incomeForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
    income_date: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
  });

  categories: any[] = [];

  formSubmitted: boolean = false;
  constructor(
    public http: HttpClient,
    public route: Router,
    public api: RestApiService,
    public expense: ExpenseService
  ) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/login']);
    } else {
      route.navigate(['/create-task']);
      this.fetchCategories();
    }
  }

  fetchCategories(): void {
    this.expense.getCategories().then(
      (response: any) => {
        this.categories = response.categories;

        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addIncome(): any {
    this.formSubmitted = true;
    this.http
      .post<any>(environment.url + 'add-income', this.incomeForm.value, {
        headers: this.api.getHeaders(),
      })
      .subscribe((data) => {
        if (data.income) {
          Swal.fire({
            icon: 'success',
            text: data.message,
          });
          this.route.navigate(['/dashboard']);
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

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  isFieldInvalid(field: string) {
    return (
      this.incomeForm.get(field)?.invalid &&
      (this.incomeForm.get(field)?.touched ||
        this.incomeForm.get(field)?.dirty ||
        this.formSubmitted)
    );
  }
  getErrorMessage(field: string, label: string): string {
    let formControlErrors = this.incomeForm.get(field)?.errors;
    if (formControlErrors) {
      let firstError = Object.keys(
        this.incomeForm.get(field)?.errors as Object
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
