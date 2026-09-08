import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';
import { CertificateComponent } from '../certificate/certificate.component';
import { CommonService } from '../common.service';
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

  readonly adminUsername = 'admin';
  readonly memberUsername = 'member';
  readonly validPassword = 'carmel2026';

  constructor(public commonService: CommonService) {}

  login(): void {
    if (this.password === this.validPassword && this.username === this.adminUsername) {
      this.isLoggedIn = true;
      this.userRole = 'admin';
      this.commonService.setUserRole('admin');
      this.loginError = '';
      return;
    }

    if (this.password === this.validPassword && this.username === this.memberUsername) {
      this.isLoggedIn = true;
      this.userRole = 'member';
      this.commonService.setUserRole('member');
      this.loginError = '';
      return;
    }

    this.loginError = 'Incorrect username or password.';
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
    this.commonService.clearUserRole();
    this.username = '';
    this.password = '';
  }

}
