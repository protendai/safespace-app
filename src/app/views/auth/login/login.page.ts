import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userId:any;

  constructor(
    private notificationService: NotificationsService,
    private apiService:ApiService,
    private storageService: StorageService,
    private router:Router,
    ) { 
      
    }

  ngOnInit() {
    
  }

  async login(){
      this.apiService.setUserId();
      this.userId = this.apiService.getUserId();
      console.log('$$$ User ID ' + this.userId);

    if(this.userId === null || this.userId === undefined){
      this.router.navigate(['/terms']);
      this.notificationService.presentToast('User not found ' + this.userId);
    }else{
      
      let data = {
          id:this.userId
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
          this.notificationService.presentToast('Login failed , Please try again');
        }
      });
    }
  }


}
