import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [MatIconModule,MatTabsModule,MatButtonModule,MatCardModule,HttpClientModule,MatListModule, MatDividerModule,MatChipsModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  family:any={};
 id:string='';
  constructor(private apiservice:ApiService,private route: ActivatedRoute){
    
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id'); // Replace 'id' with your parameter name
      this.id=id?id:'';
      this.fetchfamily();
      console.log(id);
    });
  }
  fetchfamily(){
    this.apiservice.getFamilyDetails(this.id).subscribe(response => {
      this.family=response;
      this.apiservice.getFamilyMembers(this.id).subscribe(response => {
        this.family.members=response;
      });
    });
  }
}
