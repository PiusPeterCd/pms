import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule,CdkAccordionModule,HttpClientModule,MatGridListModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})


export class ViewComponent {
  //private parishUrl="/assets/data/parish.json";
  private parishUrl="http://localhost:3000/api/getparish";
  private blockUrl="/assets/data/blocks.json";
  private http=inject(HttpClient)
  parish:any;
  blocks:any;
  // items = ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'];
  // units=[{
  //   'id':1,
  //   'name':'St francis xavier'
  // },{
  //   'id':2,
  //   'name':'St francis xavier'
  // }]
constructor(){
  this.fetchBlock();
  this.fetchParish();
}
  fetchParish(){
    this.http.get(this.parishUrl).subscribe((res:any)=>{
      this.parish=res as any;
    })
  }
  fetchBlock(){
    this.http.get(this.blockUrl).subscribe((res:any)=>{
      this.blocks=res as any;
    })
  }
  expandedIndex = 0;
}
