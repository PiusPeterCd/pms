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
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { Member } from "../member";
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
    styleUrl: './addunit.component.css',
    providers: [provideNativeDateAdapter()],
    imports: [
      MatFormFieldModule,
      MatSlideToggleModule,
      MatInputModule,
      MatSelectModule,
      MatStepperModule,
      MatChipsModule,
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
     member:any=new Member('','','','','','','','','','','','','','',false,'','','','','','','','','');
    constructor(
        private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<AddMemberDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      });
      secondFormGroup = this._formBuilder.group({
        baptizedd: [''],
        baptizedp: [''],
        confirmd: [''],
        confirmp: [''],
        mstatus: [''],
        mdate: [''],
        mparish: [''],
        sname: ['']
      });
      eduFormGroup = this._formBuilder.group({
        estatus: [''],
        job: [''],
        quali: [''],
        workplace: ['']
      });
      assFormGroup = this._formBuilder.group({
        association: [[]],
      });
      contactFormGroup = this._formBuilder.group({
        phone: [''],
        mail: ['']
      });
    onNoClick(): void {
      if(this.member.name!==undefined && this.member.name!=='')
      this.dialogRef.close(this.member);
        }
    
  }
  
   