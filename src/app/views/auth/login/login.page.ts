import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
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
    private sqliteService: SqliteService
    ) { 
      this.storageService.get('uuid').then((val)=>{
        this.userId = val
        console.log(val)
      })
      console.log(this.userId);
    }

  ngOnInit() {
  }

  async login(){
        if(this.userId !== null){
          let data = {
              id:this.userId
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
      }else{
        this.router.navigate(['terms']);
      }
  }
}
