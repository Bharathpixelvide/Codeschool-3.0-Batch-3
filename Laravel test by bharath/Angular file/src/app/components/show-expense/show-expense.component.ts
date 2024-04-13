import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-expense',
  standalone: true,
  imports: [RouterLink, HeaderComponent, CommonModule],
  templateUrl: './show-expense.component.html',
  styleUrl: './show-expense.component.css',
})
export class ShowExpenseComponent {
  expenses: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(public route: Router, public api: ExpenseService) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/login']);
    } else {
      route.navigate(['/show-expense']);
      this.showExpense(this.currentPage);
    }
  }

  showExpense(pageNumber: number): void {
    this.api.getExpenses(pageNumber).then(
      (response: any) => {
        this.expenses = response.expenses;
        this.totalPages = response.page;
        console.log(this.expenses);
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  nextPage(currentPage: number): void {
    this.currentPage = currentPage;
    this.showExpense(this.currentPage);
  }

  prevPage(currentPage: number): void {
    this.currentPage = currentPage;

    this.showExpense(this.currentPage);
  }
}
