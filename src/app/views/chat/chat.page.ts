import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';


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
  constructor(private storageService:StorageService,private apiService:ApiService,private router:Router, private notificationService: NotificationsService) { 
    // Check Payment
    this.checkPayment();
    //  Start timer
    this.t = setInterval(() => {
      this.getMessages();
    }, 5000);
  }

  ngOnInit() {
   
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }


  async checkPayment(){
    this.storageService.getUser().then((res) => {
      console.log(res.payment);
      if(res !== undefined){
        if(res.payment != 1){
          this.notificationService.presentAlert('Subscription Issue','Please make your subscription to user chat');
          this.router.navigate(['/payments']);
        }
      }else{
        this.notificationService.presentAlert('Subscription Issue','We could not verify your subscription to chat');
        this.router.navigate(['/tabs']);
      }
    },(error)=>{
      this.notificationService.presentAlert('Subscription Issue','We could not verify your subscription to chat');
      this.router.navigate(['/tabs']);
    });
    
  }

  async getMessages(){
    this.apiService.getMessages().subscribe(async (v)=>{
      try{
        this.loaded = true;
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
    this.notificationService.dismissLoader();
      console.log(v);
      if(v.success){
        this.message = '';
        this.getMessages();
      }else{
        this.notificationService.presentToast('Error' + v);
      }
  },(error) =>{
    this.notificationService.presentAlert('Error','We failed to process your request ' + error.error.message);
    this.router.navigate(['error'])
  });
  }

  ngOnDestroy(){
    console.log('Stopped Interval');
    clearInterval(this.t);
  } 

}
