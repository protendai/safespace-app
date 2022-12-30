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

  async getUser(){
    var data  =  await this.storageService.get('user');
    this.user = JSON.parse(data);
    this.data.name    = this.user.name;
    this.data.surname = this.user.surname;
    this.data.phone   = this.user.phone;
    this.data.email   = this.user.email;
    this.data.dob     = this.user.dob;
    this.data.school  = this.user.school;
    console.log(this.user);
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
