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
  quoteData$ = new BehaviorSubject<any>('');
  user:any;
  quote:any;

  constructor(private httpService: HttpService, private storageService: StorageService, private router: Router) { }

  register(data:any): Observable<any>{
    return this.httpService.post('auth/register', data);
  }

  login(data: any): Observable<any>{
    return this.httpService.post('auth/login', data);
  }

  logout(){
    // this.storageService.clear();
    this.router.navigate(['login']);
  }

  
  getQuote(): Observable<any>{
    return this.httpService.get('quote');
  }

  getMessages(): Observable<any>{
    return this.httpService.get('chat');
  }

  sendMessage(data: any): Observable<any>{
    return this.httpService.post('chat',data);
  }

  async setQuote(){
    var data  =  await this.storageService.get('quote');
    this.quote = JSON.parse(data);
    console.log(this.quote);
  }

  getQuotes(){
    return this.quote;
  }

  getUserData(){
    this.storageService.get('user').then(res =>{
      this.userData$.next(res);
      return res;
    });
  }

  async setUser(){
    var data  =  await this.storageService.get('user');
    this.user = JSON.parse(data);
    console.log(this.user);
  }

  getUser(){
    return this.user;
  }

  // Notifications
  getNotifications(): Observable<any>{
    return this.httpService.get('notifications');
  }

  // Payment
  pay(data:any): Observable<any>{
    return this.httpService.post('payment',data);
  }

  // Profile
  getProfile(): Observable<any>{
    return this.httpService.get('profile');
  }

  updateProfile(data:any): Observable<any>{
    return this.httpService.post('profile',data);
  }
}
