import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastController: ToastController,private loadingCtrl: LoadingController) { }

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
}
