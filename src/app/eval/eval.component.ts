import { Component } from '@angular/core';
import { PdfService } from '../_services/pdf.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css']
})
export class EvalComponent {
  pdfSrc: string | ArrayBuffer | null = null;

  constructor(private pdfService: PdfService) { }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.pdfService.uploadFile(file).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          // Assuming response contains the URL or identifier of the uploaded file
          // You may need to adjust based on your backend response
          this.loadPdf(response.fileName);
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }

  loadPdf(fileName: string): void {
    this.pdfService.getPdf(fileName).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.pdfSrc = reader.result;
      };
      reader.readAsDataURL(blob);
    });
  }
}
