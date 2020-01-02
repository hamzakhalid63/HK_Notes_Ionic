import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotesConfig } from '../notes.config';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    constructor(private authService: AuthService, private http: HttpClient) { }

    async getCurrentClass() {
        const token = await this.authService.getTokenFromStorage();
        const decodedtoken = this.authService.getDecodedAccessToken(token);
        const userId = decodedtoken.data._id;

        const url = NotesConfig.getPath() + `/classes/users/${userId}`;
        return this.http.get(url, {
          headers: new HttpHeaders().set('Authorization', token)
        });
    }

    async deleteUser(user) {
        const token = await this.authService.getTokenFromStorage();
        const decodedtoken = this.authService.getDecodedAccessToken(token);
        console.log(user.name);

        const url = NotesConfig.getPath() + `/classes/users/${user._id}`;
        return this.http.delete(url, {
          headers: new HttpHeaders().set('Authorization', token)
        });
    }
}
