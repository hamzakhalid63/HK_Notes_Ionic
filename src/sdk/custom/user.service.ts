import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NotesConfig} from '../notes.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public userLogin(credentials: object): Observable<any>  {
    const url = NotesConfig.getPath() + '/users/login';

    return this.http.post(url, credentials);
  }

  public userRegister(credentials: object): Observable<any>  {
    const url = NotesConfig.getPath() + '/users/register';

    return this.http.post(url, credentials);
  }
}
