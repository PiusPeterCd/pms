import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { unit } from '../unit';
import { ApiService } from "../api.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonService } from "../common.service";
export interface DialogData {
    unitdetails: any;
  }
  interface Block {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'update-family-dialog',
    templateUrl: 'update.family.component.html',
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
        HttpClientModule
    ],
  })
  export class UpdateFamilyDialog {
  family:any={}
 
    constructor(
      private apiservice:ApiService,
      public dialogRef: MatDialogRef<UpdateFamilyDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
    ngOnInit(){
      this.family = this.data;
    }
    updateFamily(){
      this.apiservice.updatefamily(this.family.id,this.family).subscribe((response)=>{
        this.dialogRef.close();
      })
    }
    onSelectChange(event: any){
      console.log(event);
     
    }
    onNoClick(): void {
       
      this.dialogRef.close();
    }
  }
  
  