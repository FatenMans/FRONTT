import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('/api/upload', formData);
  }

  getPdf(fileName: string): Observable<Blob> {
    return this.http.get(`/api/files/${fileName}`, { responseType: 'blob' });
  }
}
