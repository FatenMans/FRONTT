import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

interface Participant {
  // Define the properties of Participant here
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  Addparticipant(value: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api';
  participantSubject: Subject<Participant[]> = new Subject<Participant[]>();

  constructor(private http: HttpClient) { }

  getParticipant(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/participants/');
  }
  createParticipant(participants: any) {
    return this.http.post<any>(this.apiUrl + '/participants/', participants);
  }
  loadParticipant() {
    this.http.get<Participant[]>(this.apiUrl + '/participants/').subscribe(
      data => this.participantSubject.next(data)
    );
  }

}

