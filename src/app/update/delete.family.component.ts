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
    selector: 'delete-family-dialog',
    templateUrl: 'delete.family.component.html',
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
  export class DeleteFamilyDialog {
     blocks: Block[] = [
        {value: '1', viewValue: 'Block 1'},
        {value: '2', viewValue: 'Block 2'},
        {value: '3', viewValue: 'Block 3'},
        {value: '4', viewValue: 'Block 4'},
        {value: '5', viewValue: 'Block 5'},
      ];
      units:any=[];
      familys:any=[];
    selectedfamily:any={};
    selectedfamilyunit:any={};
    errorMessage: string='';
    constructor(
      private apiservice:ApiService,
      public dialogRef: MatDialogRef<DeleteFamilyDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
    ngOnInit(){
      this.apiservice.getUnits().subscribe(response => {
        this.units=response;
      });
    }
    onSelectChange(event: any){
      console.log(event);
      this.units.forEach((unit: unit)=> {
        if(unit.id==event.source.value){
          this.selectedfamilyunit=unit;
          this.apiservice.getFamily(this.selectedfamilyunit.id).subscribe(response => {
            this.familys=response;
          });
        }
      });
    }

    onSelectChangeFamily(event: any){
      console.log(event);
      this.familys.forEach((family: any)=> {
        if(family.id==event.source.value){
          this.selectedfamily=family;
        }
      });
    }

    onNoClick(): void {
        if(this.selectedfamily.id ==undefined){
            this.errorMessage="select the family";
        }else{        
          this.apiservice.deletefamily(this.selectedfamily.id).subscribe((response: any) => {
              this.dialogRef.close();
          });
        }
    }
  }
  
  