import { Component } from '@angular/core';
import { SqliteService } from './services/sqlite.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private initPlugin: boolean | undefined;
  constructor( private platform: Platform,private _sqlite: SqliteService) {
   this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this._sqlite.initializePlugin().then(ret => {
        this.initPlugin = ret;
        console.log('>>>> in App  this.initPlugin ' + this.initPlugin);
      });
    });
  }
}
