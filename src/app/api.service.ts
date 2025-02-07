import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // GET: Fetch all items
  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/units`);
  }
  getUnitbyBlock(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unitsbyblock/${id}`);
  }
  getUnit(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unit/${id}`);
  }
  getFamily(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/familys/${id}`);
  }
  getallFamily(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allfamilys/`);
  }
  getFamilyDetails(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/familydetails/${id}`);
  }

  // GET: Fetch a single item by ID
  getFamilyMembers(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/familymembers/${id}`);
  }
  getUnitMembers(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unitmembers/${id}`);
  }
  // GET: Fetch a single item by ID
  getMembers(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/members/${id}`);
  }

  // POST: Add a new item
  addunit(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addunit`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addfamily(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addfamily`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  addmember(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addmember`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // PUT: Update an existing item
  updateunit(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateunit/${id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updatefamily(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatefamily/${id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updatemember(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatemember/${id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // PUT: Update an existing item
  update(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateunit/${id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // DELETE: Delete an item
  deletemember(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletemember/${id}`);
  }
  deletefamily(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletefamily/${id}`);
  }
  deleteunit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteunit/${id}`);
  }
}
