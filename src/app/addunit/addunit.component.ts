import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialog } from './add.member.component';
import { CommonService } from '../common.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import {Family} from '../family'
import e from 'cors';
import { Member } from '../member';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addunit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatDatepickerModule,MatListModule, MatStepperModule,FormsModule,ReactiveFormsModule],
  templateUrl: './addunit.component.html',
  styleUrl: './addunit.component.css'
})
export class AddunitComponent {
 
  units:any=[]
  members:any=[];
  errormessage:string=''
  successMessage:string=''
  family:any=new Family('','','','','',0,'','')
  editflag: number | null = null;
  isEditMode: boolean=false;
  constructor(public dialog: MatDialog,
    private apiservice:ApiService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(){
    this.apiservice.getUnits().subscribe(response => {
      this.units=response;
    });
    this.route.paramMap.subscribe(params =>{
       //this.editflag = +params.get('id'); 
       this.isEditMode = !!this.editflag; 
      });
  }
  onAdd(): void {
    const dialogRef = this.dialog.open(AddMemberDialog, {
     
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.members.push(result);
        this.family.no_of_members++;
        console.log('Dialog result:', result);
        // Handle the result (object) here
      }
    });
  }
  
  deleteMember(index: number): void {
    this.members.splice(index, 1);
    this.family.no_of_members--;
  }
    addFamily():void {
      console.log(this.family);
      if(this.family.no_of_members==0){
        this.errormessage="Please add members";
        return;
      }
      else if(this.family.unitid==''||this.family.name==''||this.family.address==''){
        this.errormessage="Please enter the required field"
        return;
      }else{
        this.apiservice.getFamily(this.family.unitid).subscribe((response: any) => {
          let familycount=response.length+1
          var id=this.family.unitid+""+familycount;
          this.family.id=id;
          var count=1;
        this.errormessage='';
        this.apiservice.addfamily(this.family).subscribe(item => {
          console.log(item)
          this.members.forEach((element: Member) => {
            element.id=this.family.id+""+count;
            element.familyid=this.family.id;
            element.unitid=this.family.unitid;
            count++;
            console.log(element)
            this.apiservice.addmember(element).subscribe(item => {
              
            });
          });
          
              setTimeout(()=>{
                this.family=new Family('','','','','',0,'','');
              this.members=[]
              this.successMessage="Family added successfully"
              setTimeout(()=>{
                this.successMessage=''
              },5000)
              },5000);
          
        });
      });
      }
    }
  }


