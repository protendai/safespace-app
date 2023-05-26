import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any;

  data = {
    username:'',
    name:'',
    surname:'',
    phone:'',
    dob:'',
    school:'',
    email:''
  };

  constructor(private storageService: StorageService,private apiService:ApiService,private router:Router, private notificationService: NotificationsService) {
    this.getUser();
  }

  ngOnInit() {}

  getUser(){
     this.storageService.getUser().then((res) =>{
      this.data.username    = res.username;
      this.data.name    = res.name;
      this.data.surname = res.surname;
      this.data.phone   = res.phone;
      this.data.email   = res.email;
      this.data.dob     = res.dob;
      this.data.school  = res.school;
      console.log(res);
    }); 
  }

  updateProfile(){
    this.notificationService.showLoader('Updating ...');
    this.apiService.updateProfile(this.data).subscribe((v)=>{
        console.log(v);
        if(v.success){
          console.log(v.success);
          this.getProfile();
         
        }else{
          this.notificationService.presentToast('Error' + v);
        }
    });

  }

  getProfile(){
    this.notificationService.showLoader('Updating ...');
    this.apiService.getProfile().subscribe((v)=>{
        console.log(v);
        if(v.success){
          console.log(v.success);
          this.storageService.removeItem('user');
          this.storageService.store('user',v.success);
        }else{
          this.notificationService.presentToast('Error' + v);
        }
    });
  }

}
