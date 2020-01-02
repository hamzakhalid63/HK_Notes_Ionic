import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotesConfig } from '../notes.config';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  public async getAll(): Promise<any> {
    const url = NotesConfig.getPath() + '/materials';
    const token = await this.authService.getTokenFromStorage();

    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async addMaterial(data: object): Promise<any> {
    const url = NotesConfig.getPath() + '/materials/add';
    const token = await this.authService.getTokenFromStorage();

    return this.http.post(url, data, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async deleteMaterial(): Promise<any> {
    const token = await this.authService.getTokenFromStorage();
    const decodedtoken = this.authService.getDecodedAccessToken(token);
    const userId = decodedtoken.data._id;

    const url = NotesConfig.getPath() + `/materials/${userId}`;
    return this.http.delete(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
