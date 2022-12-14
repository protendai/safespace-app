import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userData$ = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService, private storageService: StorageService, private router: Router) { }

  register(): Observable<any>{
    return this.httpService.get('auth/register');
  }

  login(data: any): Observable<any>{
    return this.httpService.post('auth/login', data);
  }

  logout(){
    this.storageService.removeItem('token').then(
      res =>{
        this.storageService.clear();
        this.storageService.removeItem('user');
        this.userData$.next('');
        this.router.navigate(['login']);
      }
    );
  }

  getUserData(){
    this.storageService.get('user').then(res =>{
      // console.log(res);
      this.userData$.next(res);
    });
  }



  getMessages(): Observable<any>{
    return this.httpService.get('chat');
  }

  sendMessage(data: any): Observable<any>{
    return this.httpService.post('chat', data);
  }
}
