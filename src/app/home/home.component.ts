import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';
import { CertificateComponent } from '../certificate/certificate.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule,ViewComponent,UpdateComponent,CertificateComponent],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
