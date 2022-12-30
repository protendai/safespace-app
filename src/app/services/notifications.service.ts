import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  fbToken:any;

  constructor(private router: Router, private toastController: ToastController,private loadingCtrl: LoadingController,private alertController: AlertController) { }

  //  Basic Notifications

  async presentAlert(title:any,infoMessage: any) {
    const alert = await this.alertController.create({
      header: title,
      message: infoMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(infoMessage: any) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  async showLoader(infoMessage: any) {
    const loading = this.loadingCtrl.create({
      message: infoMessage,
      duration: 3000,
      spinner: 'circles',
    });

    (await loading).present();
  }

  dismissLoader() {
    this.loadingCtrl.dismiss().then((response) => {
        console.log('Loader closed!', response);
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
  }

  // Firebase and Push Notifications
  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      console.log('>>>>>>> Fb setup');
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
        if (permission.receive === 'granted') {
            PushNotifications.register();
            console.log('Permission Granted');
        }
        else {
            // If permission is not granted
            console.log('Permission not granted');
            console.log('Permission Not Granted');
        }
    });

    PushNotifications.addListener('registration', (token) => {
        console.log('>>>>>> FB Token '+ token.value);
        this.fbToken = token.value;
        
    });

    PushNotifications.addListener('registrationError', (err)=> {
        console.log(err);
    }); 

    PushNotifications.addListener('pushNotificationReceived', (notifications) => {
        console.log(notifications);
    });

  }

  getfbToken(){
    return this.fbToken;
  }

}
