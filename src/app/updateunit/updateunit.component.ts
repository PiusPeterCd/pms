import { Component } from '@angular/core';
import { ApiService } from "../api.service";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../common.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { unit } from '../unit';
export interface Family{
   id: string,
   unitid: string,
   unitname:string,
   blockname:string,
   name: string,
   family_head:string,
   family_head_name:string,
   no_of_members:number,
   address:string,  
   joined_on:string, 
}
@Component({
  selector: 'app-updateunit',
  standalone: true,
  imports: [  MatInputModule,
      MatTableModule,
      MatFormFieldModule,
      MatSelectModule ],
  providers:[CommonService,ApiService],
  templateUrl: './updateunit.component.html',
  styleUrl: './updateunit.component.css'
})
export class UpdateunitComponent {
  displayedColumns: string[] = ['id', 'block','unit', 'family','head','noofmembers','update'];
  dataSource:any;
  units:any=[];
  family:any=[];
   constructor(
        private apiservice:ApiService,
      ) {
      }
  ngOnInit(){
    this.apiservice.getUnits().subscribe(response => {
      this.units=response;
      this.apiservice.getallFamily().subscribe(response => {
        this.family=response;
        this.family.forEach((element:Family) => {
          element.blockname=element.id.substring(1, 2);
          element.unitname=this.findunitname(element.unitid)
        });
        this.dataSource = new MatTableDataSource(this.family);
      });
    });
    
  }
  findunitname(id:string){
    this.units.forEach((unit: any)=> {
      if(id==unit.id)
        return unit.name;
    });
    return ''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
