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
    selector: 'delete-unit-dialog',
    templateUrl: 'delete.unit.component.html',
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
  export class DeleteUnitDialog {
     blocks: Block[] = [
        {value: '1', viewValue: 'Block 1'},
        {value: '2', viewValue: 'Block 2'},
        {value: '3', viewValue: 'Block 3'},
        {value: '4', viewValue: 'Block 4'},
        {value: '5', viewValue: 'Block 5'},
      ];
      units:any=[]
    selectedunit=new unit('','','',[]);
    errorMessage: string='';
    constructor(
      private apiservice:ApiService,
      public dialogRef: MatDialogRef<DeleteUnitDialog>,
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
          this.selectedunit=unit;
        }
      });
    }
    onNoClick(): void {
        if(this.selectedunit.id ==undefined){
            this.errorMessage="select the unit";
        }else{        
          this.apiservice.deleteunit(this.selectedunit.id).subscribe((response: any) => {
              this.dialogRef.close();
          });
        }
    }
  }
  
  