import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
interface certs {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule
            ],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
   selectedValue:string="";
   certs: certs[] = [
    {value: '0', viewValue: 'baptism'},
    {value: '1', viewValue: 'wedding'},
    {value: '2', viewValue: 'community'}
  ];

   MEMBER_DATA:any=[
    {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['id', 'name', 'family', 'certificate'];
  dataSource = new MatTableDataSource(this.MEMBER_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  certificategenerate(id:string,cert:string){
    console.log(id,cert);
  }
}
