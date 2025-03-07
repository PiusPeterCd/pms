import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface PeriodicElement {
  id:string
  name: string;
  familyname: string;
  no_of_members: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatGridListModule,MatTableModule, MatPaginatorModule,HttpClientModule,MatTabsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit{
  unit:any={};
  private unitUrl="/assets/data/unit.json";
  private http=inject(HttpClient)
  displayedColumns: string[] = ['id', 'name','familyname' ,'no_of_members'];
  displayedColumns2: string[] = ['id', 'name','dob' ,'gender','phone','mail','marital_status','education_status','job'];
  dataSource:any;
  dataSource2:any;
  id: string='';
  family: any=[];
  members: any;
  
  constructor(private apiService:ApiService,private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id'); // Replace 'id' with your parameter name
      this.id=id?id:'';
      this.fetchUnit();
      console.log(id);
    });
  }
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator1;
    },2000) 
    setTimeout(()=>{
      this.dataSource2.paginator = this.paginator2; 
    },4000) 

  }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 5, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 4, color: '#DDBDF1'},
  ];
  fetchUnit(){
    // this.http.get(this.unitUrl).subscribe((res:any)=>{
    //   this.unit=res as any;
    // })
    this.apiService.getUnit(this.id).subscribe(response => {
      this.unit=response;
    });
    this.apiService.getFamily(this.id).subscribe(response => {
      this.family=response;
      this.dataSource= new MatTableDataSource<PeriodicElement>(this.family);
    });
    this.apiService.getUnitMembers(this.id).subscribe(response => {
      this.members=response;
      this.dataSource2= new MatTableDataSource<PeriodicElement>(this.members);
    });
  }
}
