import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';

import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private router: Router,
    private httpService: HttpService
    ) { }

  ngOnInit() {
  }

  hasAccepted(){
   
    this.notificationService.showLoader('Registering ...');
    this.apiService.register().subscribe(async (v)=>{
      this.notificationService.dismissLoader();
      console.log(v);
      try{ 
        if(v.success){
          this.login(v.success);
          this.getQuote();
          this.notificationService.dismissLoader();
          this.notificationService.presentToast(v.success);
        }
      }catch(e){
        this.notificationService.presentToast(e);
      }
      
    });
  }

  login(myid: any){
    let data = {
        id:myid
    };
    this.notificationService.showLoader('Login In ...');
    // Login using ID
    this.apiService.login(data).subscribe(async (v)=>{

      try{
        // Save Token and User Data
        this.storageService.store("token",v.access_token);
        this.storageService.store("user",v.user);
        this.apiService.setUser();
        // Navigate to Tabs
        this.router.navigate(['tabs']);
      }catch(e){
        this.notificationService.presentToast(e);
      }
      
    });
  }

  getQuote(){
    this.apiService.getQuote().subscribe(async (v)=>{
      console.log(v.success); 
        if(v.success){
          this.apiService.setQuote(v.success);
        }
    });
  }
}
