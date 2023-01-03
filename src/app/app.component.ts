import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NotificationsService } from './services/notifications.service';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private initPlugin: boolean | undefined;

  constructor(private platform: Platform,private notificataionService: NotificationsService,private _sqlite: SqliteService) {
   this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      this._sqlite.initializePlugin().then(ret => { this.initPlugin = ret; console.log('>>>> in App  this.initPlugin ' + this.initPlugin); });

      this.notificataionService.initPush();

    });
  }
}
