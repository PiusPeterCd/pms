import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  imports: [MatGridListModule,MatTableModule, MatPaginatorModule,HttpClientModule,MatTabsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements AfterViewInit{
  unit:any={};
  private unitUrl="/assets/data/unit.json";
  private http=inject(HttpClient)
  displayedColumns: string[] = ['id', 'name','familyname' ,'no_of_members'];
  displayedColumns2: string[] = ['id', 'name','dob' ,'gender','phone','mail','marital_status','education_status','job'];
  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  leader:any =[]
  id: string='';
  family: any[] = [];
  members: any[] = [];
  
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
    setTimeout(() => {
      this.dataSource.paginator = this.paginator1;
    }, 2000);
    setTimeout(() => {
      this.dataSource2.paginator = this.paginator2;
    }, 4000);
  }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 5, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 4, color: '#DDBDF1'},
  ];
  fetchUnit(){
    if (!this.id) {
      return;
    }

    this.apiService.getUnit(this.id).subscribe(response => {
      this.unit = response || {};
    });

    this.apiService.getFamily(this.id).subscribe(response => {
      this.family = Array.isArray(response) ? response : [];
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.family);
      this.dataSource.filterPredicate = (family: any, filter: string) =>
        String(family.name || '').toLowerCase().includes(filter);
      if (this.paginator1) {
        this.dataSource.paginator = this.paginator1;
      }
    });

    this.apiService.getUnitMembers(this.id).subscribe(response => {
      this.members = Array.isArray(response) ? response : [];
      this.dataSource2 = new MatTableDataSource<PeriodicElement>(this.members);
      this.dataSource2.filterPredicate = (member: any, filter: string) =>
        String(member.name || '').toLowerCase().includes(filter);
      if (this.paginator2) {
        this.dataSource2.paginator = this.paginator2;
      }
    });
  }

  applyFamilyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyMemberFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource2.filter = filterValue;

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

getNameFamilyLeader(id: any) {
  if (this.members && Array.isArray(this.members)) {
    const member = this.members.find((m: any) => m.id === id);
    return member ? `${member.name}` : '';
  }
  return '';
}

getContactLeader(id: any) {
  if (this.members && Array.isArray(this.members)) {
    const member = this.members.find((m: any) => m.id === id);
    return member ? `${member.phone}, ${member.mail}` : '';
  }
  return '';
}
}
