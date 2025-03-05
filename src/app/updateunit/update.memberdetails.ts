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
import { HttpClientModule } from "@angular/common/http";
import { Member } from "../member";
import { unit } from '../unit';
import { ApiService } from "../api.service";

export interface DialogData {
    unitdetails: any;
  }
  interface Block {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'update-member-details-dialog',
    templateUrl: 'update.memberdetails.html',
    standalone: true,
    styleUrl: '../addunit/addunit.component.css',
    providers: [provideNativeDateAdapter(),ApiService],
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
      HttpClientModule
    ],
  })
  export class UpdateDetailsDialog {
     member:any=new Member('','','','','','','','','','','','','','',false,'','','','','','','','','');
    heading: string = '';
    constructor(
        private _formBuilder: FormBuilder,
        public apiService:ApiService,
      public dialogRef: MatDialogRef<UpdateDetailsDialog>,
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
      delGroup = this._formBuilder.group({
        dstatus: [''],
        ddate: [''],
        tdate: ['']
      });
 ngOnInit(){
        this.member=this.data;
        if(this.member.name==undefined){
          this.heading="ADD MEMBER"
        }else{
          this.heading="UPDATE MEMBER"
          this.member.parish_association=this.member.parish_association.split(',')
        }
      
    }
    formatDate(obj:any){
      if(obj && obj!=''){
        var date=obj
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear(); 
        const formattedDate = `${day}/${month}/${year}`; 
        console.log(formattedDate); // Output: 22/01/2025 // If you only want to get the date string: return formattedDate;
        return formattedDate ;
      }
     return ''
    }
    onNoClick(): void {
      //this.member.dob=this.formatDate(this.member.dob)
      // this.member.baptized_date=this.formatDate(this.member.baptized_date)
      // this.member.confirmation_date=this.formatDate(this.member.confirmation_date)
      // this.member.marriage_date=this.formatDate(this.member.marriage_date)
      if(this.member.parish_association)
       this.member.parish_association=this.member.parish_association.toLocaleString()
     if(this.heading=='ADD MEMBER'){
      this.apiService.addmember(this.member).subscribe((response)=>{
        this.dialogRef.close();
      });
     }else{
      this.apiService.updatemember(this.member.id,this.member).subscribe((response)=>{
        this.dialogRef.close();
      });
     }
    
  }
}
   