import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ShowExpenseComponent } from './components/show-expense/show-expense.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login Page',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register Page',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'Login Page',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    title: 'Dashboard Page',
    component: DashboardComponent,
  },
  {
    path: 'add-income',
    title: 'Add Income Page',
    component: AddIncomeComponent,
  },
  {
    path: 'add-expense',
    title: 'Add Expense Page',
    component: AddExpenseComponent,
  },
  {
    path: 'show-expense',
    title: 'Shoe Expense Page',
    component: ShowExpenseComponent,
  },
];
