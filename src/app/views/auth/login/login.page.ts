import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';
import { createSchema } from 'src/app/utils/create-schema';

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
    private sqliteService: SqliteService
    ) { 
      
    }

  ngOnInit() {
    
  }

  async login(){
     return this.router.navigate(['terms']);
    // 
    var userId;
    await this.setup();

      console.log('$$$ Closing all Connections');
      await this.sqliteService.closeAllConnections();
      console.log('$$$ New Connection');
      let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
      await db.open();
      console.log('$$$ Get user UUID');
    
      let ret:any = await db.query('SELECT * FROM users;');
      // console log ID
      console.log("$$$ User ID : " + ret.values[0].user_id);
      userId = ret.values[0].user_id;
  
      if(userId !== null){
        let data = {
            id:userId
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
      }else{
        this.notificationService.presentToast('Failed to login , user id not found ' + userId);
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
      console.log('$$$ Database Exists');
      Database = true;
    }else{
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

      this.notificationService.dismissLoader();
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
}
