import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit,OnDestroy {
  loaded = false;
  message:any;
  userId:any;
  messages:any;
  user:any;
  t: any;
  constructor(private apiService:ApiService,private router:Router, private notificationService: NotificationsService) { 
    
  }

  ngOnInit() {
    //  Get user data
    this.apiService.setUser();
    this.user = this.apiService.getUser();
    console.log(this.apiService.user);
    //  Start timer
    this.t = setInterval(() => {
      this.getMessages();
    }, 10000);
    // disable skeletons
    this.loaded = true;
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }



  async getMessages(){
    this.apiService.getMessages().subscribe(async (v)=>{
      try{
       
        if(v.success){
          this.messages = v.success[0].messages;
          this.userId = v.success[0].user_id;
        }
      }catch(e){
        console.log(e);
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
        this.getMessages();
      }else{
        this.notificationService.presentToast('Error' + v);
      }
  });
  }

  ngOnDestroy(){
    console.log('Stopped Interval');
    clearInterval(this.t);
  } 

}
