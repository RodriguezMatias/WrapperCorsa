import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'

export interface Datos {
  pos : [];
  nombre: [];
  puntos: [];
}

export interface ServerData{
  url: string;
  serverName: string;
}

@Injectable()
export class DatosService {
  constructor(private http: HttpClient) {}

  getAllDatos(url:string): Observable<Datos> {
    let params = new HttpParams().set("url",url); //Create new HttpParams
    return this.http.get<Datos>('http://localhost:8000/api/datos',{params: params})
  }
  
  getrF2Datos(): Observable<Datos> {
    let params = new HttpParams(); //Create new HttpParams
    return this.http.get<Datos>('http://localhost:8000/api/datosrF2')
  }

  getServerData(): Observable<ServerData> {
    return this.http.get<ServerData>('http://localhost:8000/api/serverdata')
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