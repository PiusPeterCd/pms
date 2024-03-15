import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private clienteUrl: string;

  constructor(private http: HttpClient) {
    this.clienteUrl = '/data';
  }
  getClientes(nombre?: string, telefono?: string, direccion?: string) {
    const params: any = { nombre, telefono, direccion };
    return this.http.get(this.clienteUrl, { params });
  }
}
