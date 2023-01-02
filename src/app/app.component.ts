import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // private initPlugin: boolean | undefined;
  constructor(private notificataionService: NotificationsService ) {
   this.initializeApp();
  }

  initializeApp() {
    this.notificataionService.initPush();
  }
}
