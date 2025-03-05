import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';
import { unit } from '../unit';
import { HttpClientModule } from "@angular/common/http";
export interface DialogData {
    unitdetails: any;
  }
  interface Block {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'add-unit-dialog',
    templateUrl: 'add-unit-dialog.html',
    standalone: true,
    providers:[CommonService,ApiService],
    imports: [
      MatFormFieldModule,
      MatInputModule,
      HttpClientModule,
      MatSelectModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class AddUnitDialog {
    
     blocks: Block[] = [
        {value: '1', viewValue: 'Block 1'},
        {value: '2', viewValue: 'Block 2'},
        {value: '3', viewValue: 'Block 3'},
        {value: '4', viewValue: 'Block 4'},
        {value: '5', viewValue: 'Block 5'},
      ];
    errorMessage:string=""
    unit=new unit('','','','','','','','','','','','','','');;
    constructor(
      public dialogRef: MatDialogRef<AddUnitDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private commonService: CommonService,
      private apiservice:ApiService
    ) {}
  
    onNoClick(): void {
        if(this.unit.name ==''||this.unit.block_no==''){
            this.errorMessage="Enter the required field"
        }else{        
          this.apiservice.getUnitbyBlock(this.unit.block_no).subscribe((response: any) => {
            let count=response.length+1
            var id="1"+this.unit.block_no+""+count;
            this.unit.id=id;
            this.apiservice.addunit(this.unit).subscribe(item => {
              this.dialogRef.close();
            });
          });
        }
    }
  }
  
  