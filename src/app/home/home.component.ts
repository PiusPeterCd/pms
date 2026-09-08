import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';
import { CertificateComponent } from '../certificate/certificate.component';
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

  readonly validUsername = 'admin';
  readonly validPassword = 'carmel2026';

  login(): void {
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.isLoggedIn = true;
      this.loginError = '';
      return;
    }

    this.loginError = 'Incorrect username or password.';
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
  }

}
