import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  data = {
    phone:'',
    amount:10.00,
    paymentMethod:'',
    paymentGateway:'Paynow'
  };
  constructor(private alertController: AlertController, private apiService:ApiService,private router:Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.presentAlert()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'You need an active subscription to be able to use the reporting and chat feature.',
      buttons: [
        {
          text: 'Continue',
          role: 'cancel',
          handler: () => {
            this.cancel();
          },
        },
        {
          text: 'Make Payment',
          role: 'confirm',
          handler: () => {
            console.log('Confirmend');
          },
        },
      ],
    });

    await alert.present();
  }

  cancel(){
    this.router.navigate(['/tabs'])
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }

  makePayment(){
    console.log(this.data);
    this.notificationService.showLoader('Processing Payment');
    this.apiService.pay(this.data).subscribe((v)=>{
        console.log(v);
        if(v.success){
          this.notificationService.presentToast(v.success);
        }else{
          this.notificationService.presentToast('Error' + v);
        }
    });
  }

}