import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';
import { CertificateComponent } from '../certificate/certificate.component';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatTabsModule,ViewComponent,UpdateComponent,CertificateComponent],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username = '';
  password = '';
  loginError = '';
  isLoggedIn = false;
  userRole: 'admin' | 'member' | null = null;

  constructor(public commonService: CommonService, private apiService: ApiService) {}

  login(): void {
    this.loginError = '';
    this.apiService.login(this.username, this.password).subscribe({
      next: response => {
        this.isLoggedIn = true;
        this.userRole = response.role;
        this.commonService.setSession(response.role, response.token);
        this.password = '';
      },
      error: error => {
        this.isLoggedIn = false;
        this.userRole = null;
        this.loginError = error.status === 0
          ? 'Unable to reach the login service.'
          : 'Incorrect username or password.';
      }
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
    const token = this.commonService.authToken();
    if (token) {
      this.apiService.logout(token).subscribe({ complete: () => this.commonService.clearUserRole() });
    } else {
      this.commonService.clearUserRole();
    }
    this.username = '';
    this.password = '';
  }

}
