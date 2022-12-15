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
    return this.login("1bedb356-e73d-4100-b198-6f54859e9ba3");
    // return this.login("d4dfd857-2e38-469f-a2a3-448ed5e33ca9");

    this.notificationService.showLoader('Registering ...');
    // return this.storageService.createDb();
    this.apiService.register().subscribe(async (v)=>{
      this.notificationService.dismissLoader();
      console.log(v);
      try{
        var resp =  await this.storageService.saveToDb(v.success);
        if(resp === true){
          console.log("Login In");
          this.login(v.success);
          this.notificationService.dismissLoader();
        }
        console.log("Response "+ resp);
        this.notificationService.presentToast(resp);
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
        // Navigate to Tabs
        this.router.navigate(['tabs']);
      }catch(e){
        this.notificationService.presentToast(e);
      }
      
    });
  }
}
