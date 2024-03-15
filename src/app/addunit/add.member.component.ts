import { Component, Inject } from "@angular/core";
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { unit } from '../unit';

export interface DialogData {
    unitdetails: any;
  }
  interface Block {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'add-member-dialog',
    templateUrl: 'add.member.component.html',
    standalone: true,
    
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatStepperModule,
      FormsModule,
      MatButtonModule,
      MatDatepickerModule,
      MatRadioModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      ReactiveFormsModule,
      MatDialogClose,
    ],
  })
  export class AddMemberDialog {
     blocks: Block[] = [
        {value: '1', viewValue: 'Block 1'},
        {value: '2', viewValue: 'Block 2'},
        {value: '3', viewValue: 'Block 3'},
        {value: '4', viewValue: 'Block 4'},
        {value: '5', viewValue: 'Block 5'},
      ];
  
    constructor(
        private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<AddMemberDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      });
      secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
    onNoClick(): void {
      this.dialogRef.close();
        }
    
  }
  
  