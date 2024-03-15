import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-family',
  standalone: true,
  imports: [MatIconModule,MatTabsModule,MatButtonModule,MatCardModule,HttpClientModule,MatListModule, MatDividerModule,MatChipsModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  family:any={};
  private familyUrl="/assets/data/family.json";
  private http=inject(HttpClient)
  constructor(){
    this.fetchfamily();
  }
  fetchfamily(){
    this.http.get(this.familyUrl).subscribe((res:any)=>{
      this.family=res as any;
    })
  }
}
