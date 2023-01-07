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
    private sqliteService: SqliteService,
    private databaseService: DatabaseService
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

      this.notificationService.showLoader('Login In ...');
      // Login using ID
      this.apiService.login(this.data).subscribe(async (v)=>{
        try{
          this.notificationService.dismissLoader();
          // Save Token and User Data
          this.storageService.store("token",v.access_token);
          this.storageService.store("user",v.user);
          this.storageService.store("payment",v.user.payment_status);
          // Navigate to Tabs
          this.router.navigate(['tabs']);
        }catch(e){
          this.notificationService.dismissLoader();
          this.notificationService.presentToast('Login failed , Please try again');
        }
      });
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
