import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications:any;

  constructor(private apiService:ApiService) { 
    this.getNotifications();
  }

  ngOnInit() {
  }

  async getNotifications(){
    this.apiService.getNotifications().subscribe(async (v)=>{
      try{
       
        if(v.success){
          console.log(v.success);
          this.notifications = v.success;
        }
      }catch(e){
        console.log(e);
      }
      
    });
  }

}
