import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { NotificationsService } from './notifications.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isRefreshToken = false;
 

  constructor(private httpService: HttpService) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.isInAccessList(request.url)){
      return next.handle(request);
    }else{
      return next.handle(this.addToken(request)).pipe();
    }
  }

  private isInAccessList(url: string): boolean{
    if(url === `${environment.apiUrl}auth/login`){
      return true;
    }else{
      return false;
    }
  }

  private addToken(req: HttpRequest<any>){
    
    if(this.httpService.accessToken){
      
      return req.clone({
        headers: new HttpHeaders({
          'content-type':'application/json',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: this.httpService.accessToken
        }),
      });
    }else{
      return req;
    }
  }

  
}
