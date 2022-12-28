import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public data = {
    dob:'',
    school:''
  };

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private router: Router,
    private sqliteService : SqliteService
  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.data);
    return 0;
    // return this.login('e5f25efe-319a-4644-9417-78a4bca2b01b');
    this.notificationService.showLoader('Registering ...');
    this.apiService.register(this.data).subscribe(async (v)=>{
      this.notificationService.dismissLoader();
      console.log(v);
      try{ 
        if(v.success){
          this.login(v.success);
          this.getQuote();
          this.notificationService.dismissLoader();
          // this.notificationService.presentToast(v.success);
        }
      }catch(e){
        this.notificationService.presentToast(e);
      }
      
    });
  }

  async login(myid: any){
    this.notificationService.showLoader('Login In ...');
    let data = {
        id:myid
    };
    // console.log('$$$ Closing all Connections');
    // await this.sqliteService.closeAllConnections();
    // console.log('$$$ New Connection');
    // let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
    // await db.open();
    // console.log('$$$ Inserting UUID');
    // var sqlcmd = 'INSERT INTO users (user_id) VALUES (?)';
    // var values = [myid];
    // let ret:any = await db.run(sqlcmd, values);

    // console.log('$$$ Inserting Result ' + ret.changes.changes);
    // if (ret.changes.changes  !== 1) {
    //   console.log('Execute save user failed');
    // }

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
      console.log(v); 
        if(v.success){
          this.storageService.store("quote",v.success);
          this.apiService.setQuote();
        }
    });
  }

}