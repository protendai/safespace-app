import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private httpService: HttpService) { 

  }

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
    let token = this.httpService.accessToken;
    
    if(token){
      return req.clone({
        headers: new HttpHeaders({
          'content-type':'application/json',
          Authorization: token.replace(/"/g,"")
        }),
      });
    }else{
      return req;
    }
  }

  
}
