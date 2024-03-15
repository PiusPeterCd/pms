import { Component, Inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddUnitDialog } from './add.unit.component';
import { UpdateUnitDialog } from './update.unit.component';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})

export class UpdateComponent {
 
  constructor(public dialog: MatDialog) {}
  onAdd(): void {
    const dialogRef = this.dialog.open(AddUnitDialog, {
     
    });
   
  }
  onUpdate(){
    const dialogRef = this.dialog.open(UpdateUnitDialog, {
     
    });
  }
}