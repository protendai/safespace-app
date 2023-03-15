import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/sqlite.service';
import { createSchema } from 'src/app/utils/create-schema';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userId:any;
  data = {
    username:'',
    password:'',
    fbToken:'',
  };

  constructor(
    private notificationService: NotificationsService,
    private apiService:ApiService,
    private storageService: StorageService,
    private router:Router,
    private alertController: AlertController,
    ) { 

      Network.addListener('networkStatusChange', status => {
        // console.log('Network status changed', status.connected);
        if(status.connected !== true){
          this.presentAlert('Your phone is not connected to the internet');
        }
      }); 

      this.data.fbToken = this.notificationService.getfbToken();
      console.log('set fb token ' + this.data.fbToken);
    }

  ngOnInit() {
    this.checkNetwork();
  }

  async login(){
    if(this.data.username === "" || this.data.password === ""){
      return this.notificationService.presentAlert("Login failed","Please provide both username and password");
    }else{
      this.notificationService.showLoader('Login In ...');
      // Login using ID
      this.apiService.login(this.data).subscribe(async (v)=>{
          if(v.error){
            console.log(v.error);
            this.notificationService.dismissLoader();
            this.notificationService.presentToast('Login failed , Please check your logins and try again');
          }else{
            console.log(v.user);
            this.notificationService.dismissLoader();
            // Save Token and User Data
            this.storageService.store("token",v.access_token);
            this.storageService.store("user",v.user);
            this.storageService.store("uuid",v.user.uuid);
            this.storageService.store("payment",v.user.payment_status);
            this.storageService.setPayment(v.user.payment_status);
            this.storageService.saveToDb(v.access_token);
            // Navigate to Welcome Page
            this.router.navigate(['/welcome/' + 1]);
          }
      },
      (error) => {
        console.log(error.error);
        this.notificationService.dismissLoader();
        this.notificationService.presentAlert("Login failed","Please check your logins and try again");
      });
    }
    
  }

  async checkNetwork(){
      const status = await Network.getStatus();
      if(status.connected !== true){
        this.presentAlert('Your phone is not connected to the internet');
      }
  }

  async presentAlert(infoMessage:any) {
    const alert = await this.alertController.create({
      header: 'Notice!',
      message: infoMessage,
      buttons: ['Try Again'],
    });

    await alert.present();
  }
}
