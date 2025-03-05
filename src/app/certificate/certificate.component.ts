import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  standalone: true,
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  name: string = 'John Doe'; // This would be dynamically populated
  date: string = new Date().toLocaleDateString();

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
