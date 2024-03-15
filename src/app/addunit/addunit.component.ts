import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialog } from './add.member.component';
@Component({
  selector: 'app-addunit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule,MatInputModule,MatIconModule,MatFormFieldModule,MatDatepickerModule,MatListModule, MatStepperModule,FormsModule,ReactiveFormsModule],
  templateUrl: './addunit.component.html',
  styleUrl: './addunit.component.css'
})
export class AddunitComponent {
 
  constructor(public dialog: MatDialog) {}
  onAdd(): void {
    const dialogRef = this.dialog.open(AddMemberDialog, {
     
    });
  }

}
