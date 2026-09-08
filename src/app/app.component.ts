import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,ViewComponent,RouterModule,MatIconModule,HttpClientModule,FormsModule],
  providers:[CommonService,ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pms';
  settingsOpen = false;
  passwordTarget: 'admin' | 'member' = 'admin';
  newPassword = '';
  confirmPassword = '';
  settingsError = '';
  settingsMessage = '';

  constructor(
    public commonService: CommonService,
    private router: Router,
    private apiService: ApiService
  ) {}

  logout(): void {
    this.commonService.clearUserRole();
    this.router.navigate(['/']);
  }

  changePassword(): void {
    this.settingsError = '';
    this.settingsMessage = '';

    if (this.newPassword.length < 8) {
      this.settingsError = 'Password must be at least 8 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.settingsError = 'Passwords do not match.';
      return;
    }

    const token = this.commonService.authToken();
    if (!token || !this.commonService.isAdmin()) {
      this.settingsError = 'Administrator session required.';
      return;
    }

    this.apiService.changePassword(token, this.passwordTarget, this.newPassword).subscribe({
      next: (response: { message: string }) => {
        this.settingsMessage = response.message;
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (error: { error?: { error?: string } }) => {
        this.settingsError = error.error?.error || 'Unable to change password.';
      }
    });
  }
}
