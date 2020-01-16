import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Datos {
  pos : [];
  nombre: [];
  puntos: [];
}

@Injectable()
export class DatosService {
  constructor(private http: HttpClient) {}

  getAllDatos(): Observable<Datos> {
    return this.http.get<Datos>('http://localhost:8000/api/datos')
  }

  // getCat(name: string): Observable<Cat> {
  //   return this.http.get<Cat>('http://localhost:8000/api/cats/' + name)
  // }

  // insertCat(cat: Cat): Observable<Cat> {
  //   return this.http.post<Cat>('http://localhost:8000/api/cats/', cat)
  // }

  // updateCat(cat: Cat): Observable<void> {
  //   return this.http.put<void>(
  //     'http://localhost:8000/api/cats/' + cat.name,
  //     cat
  //   )
  // }

  // deleteCat(name: string) {
  //   return this.http.delete('http://localhost:8000/api/cats/' + name)
  // }
}