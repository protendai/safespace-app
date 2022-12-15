import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private notificationService: NotificationsService,
    private apiService:ApiService,
    private storageService: StorageService,
    private router:Router,
    private httpService: HttpService
    ) { }

  ngOnInit() {
  }

  login(){
    // let uuid = this.storageService.getFromDb();
    let uuid = "1bedb356-e73d-4100-b198-6f54859e9ba3";

    if(uuid !== null){
      let data = {
          id:uuid
      };
      this.notificationService.showLoader('Login In ...');
      // Login using ID
      this.apiService.login(data).subscribe(async (v)=>{
        // console.log(v.access_token);
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
    }{
      this.router.navigate(['terms'])
    }
    
  }

}
