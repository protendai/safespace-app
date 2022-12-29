import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  fbToken:any;

  constructor(private toastController: ToastController,private loadingCtrl: LoadingController) { }

  //  Basic Notifications

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
      this.presentToast('Fb setup');
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
        if (permission.receive === 'granted') {
            PushNotifications.register();
            this.presentToast('Permission Granted');
        }
        else {
            // If permission is not granted
            console.log('Permission not granted');
            this.presentToast('Permission Not Granted');
        }
    });

    PushNotifications.addListener('registration', (token) => {
        console.log(token);
        this.fbToken = token;
        this.presentToast(token);
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
