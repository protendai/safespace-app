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
        console.log('Network status changed', status.connected);
        if(status.connected !== true){
          this.presentAlert('Your phone is not connected to the internet');
        }
      }); 
    }

  ngOnInit() {
    // this.setup();
  }

  async login(){
    this.databaseService.createTable();
    this.checkNetwork();
    // let userId = await this.checkAuth();
    let userId = this.databaseService.getData();
    
    console.log('User ID ' + userId);
    
    if(userId === null || userId === undefined){
      this.router.navigate(['/terms']);
    }else{
      
      let data = {
          id:userId
      };

      this.notificationService.showLoader('Login In ...');
      // Login using ID
      this.apiService.login(data).subscribe(async (v)=>{
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
  }

  async setup(){

    var db:any;
    var Connected:boolean;
    var Database:boolean
    // Check if DB exists
    this.notificationService.showLoader('Setting up Database...');
    let res = await this.sqliteService.isDatabase('app-db');

    console.log('$$$ Check Database ' + res.result);
    if(res.result === true){
      this.notificationService.dismissLoader();
      console.log('$$$ Database Exists');
      Database = true;
    }else{
      this.notificationService.dismissLoader();
      console.log('$$$ Creating Database');
      db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);

      // open db app-db
      await db.open();

      // create tables in db
      let ret: any = await db.execute(createSchema);
      console.log('$$$ Create Tables ' + ret.changes.changes);
      if (ret.changes.changes < 0) {
        console.log('$$$ Execute createSchema failed');
      }
      this.router.navigate(['terms']);
    }

    // Check if Connection Exists
    console.log('$$$ Check if connection exists');
    res = await this.sqliteService.isConnection('app-db');
    console.log('$$$ Check Connection ' + res.result);
    if(res.result !== true){
      console.log('$$$ No Connection');
      db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
      await db.open();
      console.log('$$$ Connecting to database');
      Connected = true;
    }

    this.notificationService.dismissLoader();
  }

  async checkAuth(){
    
    console.log('$$$ Closing all Connections');
    await this.sqliteService.closeAllConnections();
    console.log('$$$ New Connection');
    let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
    await db.open();
    console.log('$$$ Get user UUID');
  
    let ret:any = await db.query('SELECT * FROM users;');
    // console log ID
    console.log("$$$ User ID : " + ret.values[0].user_id);
    let userId = ret.values[0].user_id;
    return userId;
  }

  async checkNetwork(){
      const status = await Network.getStatus();
      console.log('Network status:', status);
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
