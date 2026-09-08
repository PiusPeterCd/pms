import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-certificate',
  standalone: true,
  templateUrl: './certificate.component.html',
  imports: [MatSelectModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  name: string = ''; // This would be dynamically populated
  date: string = new Date().toLocaleDateString();

  viewCertificate: boolean = false;

  ///create model certificate WHICH WILL BE ISSUED FROM PARISH  
  //initialize all values to empty  
  certificate = {
    name: '',
    date: '',
    parish: '',
    priest: '',
    type: ''
  };
  // Object to hold the seal image
  seal = {
    src: 'assets/images/seal.png', // Path to the seal image
    alt: 'Official Seal'
  };

  // Object to hold the signature image
  signature = {
    src: 'assets/images/signature.png', // Path to the signature image
    alt: 'Priest Signature'
  };
  // Object to hold the issued date
  issuedDate = {
    date: new Date().toLocaleDateString() // Current date
  };
  //method to show the certificate
  /**
   * Toggles the visibility of the certificate view.
   * When invoked, this method sets the `viewCertificate` property to `true`,
   * indicating that the certificate should be displayed.
   */
  generateCertificate() {
    this.viewCertificate = true
    
  } 
  




  generatePDF() {
    const DATA = document.getElementById('certificate');
    if(DATA){
    html2canvas(DATA).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    });
  }
  }
}
