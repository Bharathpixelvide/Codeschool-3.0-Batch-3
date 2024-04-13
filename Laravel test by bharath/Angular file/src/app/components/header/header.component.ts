import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userDetails: any;
  menus: any;
  logoutButton: boolean = true;

  constructor(public route: Router, public api: AuthService) {
    this.displayUserDetails();
  }
  displayUserDetails() {
    this.api.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response.user;
        console.log(this.userDetails);
        this.getMenus();
      },
      (error) => {
        console.error('Error fetching user Details:', error);
      }
    );
  }

  getMenus(): void {
    this.api.getMenus().subscribe((response) => {
      if (response) {
        this.logoutButton = false;
        this.menus = response.menus;
      }

      console.log(this.menus);
    });
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
