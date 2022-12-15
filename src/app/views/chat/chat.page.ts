import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message:any;
  userId:any;
  messages:any;
  user:any;

  constructor(private apiService:ApiService,private router:Router, private notificationService: NotificationsService) { 
    this.user = this.apiService.getUser();
    console.log(this.user);
    this.getMessages();
    setInterval(() => {
      this.getMessages();
    }, 30000);
  }

  ngOnInit() {
    this.getMessages();
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }

  async getMessages(){
    this.notificationService.showLoader('Updating...');
    this.apiService.getMessages().subscribe(async (v)=>{
      // this.notificationService.dismissLoader();
      console.log(v);
      try{
       
        if(v.success){
          this.messages = v.success[0].messages;
          this.userId = v.success[0].user_id;
          // this.notificationService.dismissLoader();
        }
      }catch(e){
        this.notificationService.presentToast(e);
      }
      
    });
  }

  sendMessage(){
  let data = { message:this.message };
  this.notificationService.showLoader('Sending ...');
  this.apiService.sendMessage(data).subscribe((v)=>{
      console.log(v);
      if(v.success){
        this.message = '';
      }else{
        this.notificationService.presentToast('Error' + v);
      }
  });
  }

}
