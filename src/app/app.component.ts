import { Component } from '@angular/core';
import { SqliteService } from './services/sqlite.service';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { NotificationsService } from './services/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // private initPlugin: boolean | undefined;
  constructor(private platform: Platform, private notificataionService: NotificationsService ) {
  //  this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.notificataionService.initPush();
    });
  }
}
