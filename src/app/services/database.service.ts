import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db:any;

  constructor(private sqlite: SQLite,private notificationsService: NotificationsService) { }

  async initDb(){

    this.notificationsService.showLoader('Setting up Database');
    console.log('>>>>>>> Creating and opening Database')
    this.sqlite.create({ name: 'data.db', location: 'default'}).then((db: SQLiteObject) => {
      this.db = db;
      this.createTable();
      this.notificationsService.dismissLoader();
    }).catch(e => console.log(e));
  }

  async createTable(){
    this.db.executeSql('create table users (user_id VARCHAR(255))', [])
    .then(() => console.log('>>>>>>> Executed SQL : Created Table'))
    .catch((e: any) => console.log(e));

    return true;
  }

  async saveData(user_id:any){
    this.db.executeSql('INSERT INTO users (user_id) VALUES (?)',[user_id])
    .then((res:any) => {
      console.log('>>>>>>> Executed SQL : Created Record ' + res)
    })
    .catch((e:any) => console.log(e))
  }

  getData(){
    console.log('>>>>>>> Executed SQL : Get Data')
    this.db.executeSql('SELECT count(*) As total FROM users',[])
    .then((res:any) => {
      this.notificationsService.presentToast(JSON.stringify(res));
      console.log('>>>>>>> Executed SQL : User data Value ' + res)
    })
    .catch((e:any) => {
      console.log(e);
      return undefined;
    })
  }

}
