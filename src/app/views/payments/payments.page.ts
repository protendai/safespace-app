import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  id:any

  data = {
    phone:'',
    amount:10.00,
    paymentMethod:'',
    paymentGateway:'Paynow'
  };

  constructor(private storageService: StorageService,private alertController: AlertController, private apiService:ApiService,private router:Router, private notificationService: NotificationsService,private actionSheetCtrl: ActionSheetController) {
    this.storageService.get('uuid').then((val) => {
      this.id = val.replace(/"/g,"");
    });
  }

  ngOnInit() {
    // this.presentAlert()
  }

  async presentActionSheet() {

    this.storageService.get('uuid').then((val) => {
      this.id = val.replace(/"/g,"");
      console.log("ID :" + this.id);
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Make Payment',
      subHeader: 'Select your desired payment method',
      buttons: [
        {
          text: 'Visa/Mastercard',
          handler: () => {
            this.makeUSDPayment();
          },
        },
        {
          text: 'RTGS Payments',
          handler: () => {
            this.makeRTGSPayment();
          },
        },
        {
          text: 'Upload proof of payment',
          handler: () => {
            this.router.navigate(['/payments-pop']);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

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
          this.notificationService.dismissLoader();
          this.updateProfile();
          this.notificationService.presentToast(v.success);
        }else{
          this.notificationService.dismissLoader();
          this.notificationService.presentToast('Error' + v);
        }
    });
    
  }

  async makeRTGSPayment(){

    if(this.id === undefined || this.id === ''){
      this.notificationService.presentToast('Failed to initiate payment. Please try again');
    }

    await Browser.open({ url: 'https://safespace.stapps.co.za/payments/pay/'+this.id+'/ZWL' });
  }

  async makeUSDPayment(){
   
    if(this.id === undefined || this.id === ''){
      this.notificationService.presentToast('Failed to initiate payment. Please try again');
    }

    await Browser.open({ url: 'https://safespace.stapps.co.za/payments/pay/'+this.id+'/USD' });
  }

  updateProfile(){
    console.log(this.data);
    this.notificationService.showLoader('Processing Payment');
    this.apiService.getProfile().subscribe((v)=>{
        console.log(v);
        if(v.success){
          this.notificationService.dismissLoader();
          console.log(v.success);
          this.storageService.removeItem("user");
          this.storageService.store("user",v.success);
          this.router.navigate(['/tabs']);
        }else{
          this.notificationService.dismissLoader();
          this.notificationService.presentToast('Error' + v);
        }
    });
  }

}
