import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
  ) { }

  ngOnInit() {
  }

  register(){

    console.log(this.data);
    // return this.login('e5f25efe-319a-4644-9417-78a4bca2b01b');
    this.notificationService.showLoader('Registering ...');
    this.apiService.register(this.data).subscribe(async (v)=>{
      this.notificationService.dismissLoader();
      console.log(v);
      try{ 
        if(v.success){
          this.login(v.success);
          this.getQuote();
        }
      }catch(e){
        this.notificationService.presentToast(e);
      }
    });
  }

  async login(myid: any){
    this.storageService.store("id",myid);
    this.notificationService.showLoader('Login In ...');
    
    let data = {
        id:myid,
        fbToken: this.notificationService.getfbToken()
    };

    // Login using ID
    this.apiService.login(data).subscribe(async (v)=>{
      this.notificationService.dismissLoader();
      try{
        // Save Token and User Data
        this.storageService.store("token",v.access_token);
        this.storageService.store("user",v.user);
        this.apiService.setUser();
        // Navigate to Tabs
        this.router.navigate(['tabs']);
      }catch(e){
        this.notificationService.presentToast('Login failed  , Please try again');
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
