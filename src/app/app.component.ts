import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,ViewComponent,RouterModule,MatIconModule,HttpClientModule],
  providers:[CommonService,ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pms';
}
