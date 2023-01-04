import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db:any;

  constructor(private sqlite: SQLite,private notificationsService: NotificationsService) { }

  initDb(){
    this.notificationsService.showLoader('Setting up Database');
    console.log('>>>>>>> Creating and opening Database')
    this.sqlite.create({ name: 'data.db', location: 'default'}).then((db: SQLiteObject) => {
      this.db = db;
      // this.createTable();
      this.notificationsService.dismissLoader();
      console.log('>>>>>>> Database :' +db);
    }).catch(e => console.log(e));
  }

  createTable(){
    this.db.executeSql('create table users (user_id VARCHAR(255))', [])
    .then(() => console.log('>>>>>>> Executed SQL : Created Table'))
    .catch((e: any) => console.log(e));

    return true;
  }

  saveData(user_id:any){
    this.db.executeSql('INSERT INTO users (user_id) VALUES (?)',[user_id])
    .then((res:any) => console.log('>>>>>>> Executed SQL : Created Record ' + res))
    .catch((e:any) => console.log(e))
  }

  getData(){
    this.db.executeSql('SELECT user_id FROM users')
    .then((res:any) => {
      console.log('>>>>>>> Executed SQL : User data ' + res.rows.item(0).user_id)
      return res.rows.item(0).user_id;
    })
    .catch((e:any) => {
      console.log(e);
      return undefined;
    })
  }

}
