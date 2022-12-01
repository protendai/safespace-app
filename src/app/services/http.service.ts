import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  accessToken = null;
  constructor(private http: HttpClient, private storageService: StorageService) { }

  post(serviceName: string , data: any): Observable<any>{
    const headers = new HttpHeaders({
      'content-type':'application/json'
    });
    const options = { headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;

    return this.http.post(url,JSON.stringify(data), options);
  }

  get(serviceName: string){
    const headers = new HttpHeaders({
      'content-type':'application/json',
    });
    const options = { headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, options);
  }
}
