import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule,ViewComponent,UpdateComponent],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
