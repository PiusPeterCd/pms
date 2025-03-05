import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { unit } from '../unit';
import { ApiService } from "../api.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonService } from "../common.service";
import { MatTableDataSource,MatTableModule } from "@angular/material/table";
import { UpdateDetailsDialog } from "./update.memberdetails";
export interface DialogData {
    unitdetails: any;
  }
  interface Block {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'update-member-dialog',
    templateUrl: 'update.member.component.html',
    standalone: true,
    providers:[CommonService,ApiService],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatTableModule,
        HttpClientModule
    ],
  })
  export class UpdateMemberDialog {
    displayedColumns: string[] = ['id', 'name','dob', 'update', 'delete'];
  members:any=[]
  dataSource:any;

 
    constructor(
      private apiservice:ApiService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<UpdateMemberDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
    ngOnInit(){
      var id:any=this.data;
      this.apiservice.getFamilyMembers(id).subscribe(response => {
        this.members=response;
        this.dataSource = new MatTableDataSource(this.members);
        });
        
      
    }
    onSelectChange(event: any){
      console.log(event);
     
    }
    onNoClick(): void {
       
      this.dialogRef.close();
    }
     onUpdate(element: any): void {
        const dialogRef = this.dialog.open(UpdateDetailsDialog, {
         data:element
        });
    }
    onAdd(): void {
      var newmember:any={}
      var id:any=this.data;
        newmember.familyid=id;
        newmember.unitid=id.slice(0, 3)
        newmember.id=id+''+(this.members.length+1)
        const dialogRef = this.dialog.open(UpdateDetailsDialog, {
         data:newmember
        });
  }
    onDelete(element: any): void {
     this.apiservice.deletemember(element.id).subscribe((response)=>{
      this.members=response;
     this.apiservice.getFamily(element.familyid).subscribe((family:any)=>{
      family.no_of_members=family.no_of_members-1;
      this.apiservice.updatefamily(family.id,family).subscribe((res)=>{
      })
     })
    
     })
  }
}

  
  