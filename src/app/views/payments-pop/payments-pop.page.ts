import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payments-pop',
  templateUrl: './payments-pop.page.html',
  styleUrls: ['./payments-pop.page.scss'],
})
export class PaymentsPopPage implements OnInit {

  public data = {
    type:'',
    names:'',
    phone:'',
    pop:'',
  };

  constructor(
    private router:Router,
    private apiService: ApiService,
    private alertController: AlertController,
    private notificationService: NotificationsService,

    ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'Your proof of payment has been submitted.You will be notified once it has been accepted',
      buttons: [
        {
          text: 'Proceed',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs']);
          },
        },
      ],
    });

    await alert.present();
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }

  upload(){
 
     console.log(this.data);

      if(this.data.names === "" || this.data.pop === "" || this.data.phone === ""){
        this.notificationService.presentAlert("Warning","Please fill in all required fields");
      }else{
        
        this.notificationService.showLoader('Loading...');
        this.apiService.manualPay(this.data).subscribe(async (v)=>{
          this.notificationService.dismissLoader();
          console.log(v);
   
            if(v.success){
              console.log(v.success);
              this.presentAlert();
            }
          
        },(error) => {
          console.log(error.error);
          this.notificationService.dismissLoader();
          this.notificationService.presentAlert("Operation failed","Please try again");
        });
    
      }

  }


}
