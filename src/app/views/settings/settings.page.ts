import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  data = {
    currentPassword:'',
    newPassword:'',
  }
  constructor(private router:Router, private apiService:ApiService,private notifications : NotificationsService) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }

  updatePassword(){
    if(this.data.currentPassword == '' || this.data.newPassword == ''){
      this.notifications.presentAlert('Warning','One or more fields requred are blank');
    }else{
      this.notifications.showLoader('Updating ...');
      this.apiService.updateProfile(this.data).subscribe((v)=>{
          console.log(v);
          if(v.success){
            this.notifications.presentToast('Password changed successfuly');
            this.router.navigate(['/tabs']);
          }else{
            this.notifications.presentToast('Error' + v);
          }
      });
    }
  }

}
