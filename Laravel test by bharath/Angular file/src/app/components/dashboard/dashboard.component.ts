import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  incomes: any[] = [];

  constructor(public route: Router, public api: ExpenseService) {
    this.showIncome();
  }

  showIncome(): void {
    this.api.getIncomes().then(
      (response: any) => {
        this.incomes = response.incomes;
        console.log(this.incomes);
      },
      (error) => {
        console.error('Error fetching incomes:', error);
      }
    );
  }
}
