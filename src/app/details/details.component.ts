import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  imports: [MatGridListModule,MatTableModule, MatPaginatorModule,HttpClientModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit{
  unit:any={};
  private unitUrl="/assets/data/unit.json";
  private http=inject(HttpClient)
  displayedColumns: string[] = ['id', 'name','familyname' ,'no_of_members'];
  dataSource:any;
  constructor(){
    this.fetchUnit();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 4, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 3, color: '#DDBDF1'},
  ];
  fetchUnit(){
    this.http.get(this.unitUrl).subscribe((res:any)=>{
      this.unit=res as any;
    this.dataSource= new MatTableDataSource<PeriodicElement>(this.unit.families);
    })
  }
}
