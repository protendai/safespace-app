import { Injectable } from '@angular/core';
import { createSchema } from '../utils/create-schema';
// import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NotificationsService } from './notifications.service';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db:any;

  constructor(private notificationsService: NotificationsService,private sqlite: SqliteService ) {
    
   }

  setupDb(){
    console.log('>>> Setup DB');
    this.notificationsService.showLoader('Creating DB');
    this.db = this.sqlite.createConnection('app-db',false,'no-encryption',1);
    console.log('>>> Setup DB ' + this.db);
    this.notificationsService.dismissLoader();
  }

  async createTable(){
    // open db app-db
    let db =  await this.sqlite.createConnection('app-db',false,'no-encryption',1);
    await db.open();

    // create tables in db
    let ret: any = await db.execute(createSchema);
    console.log('>>> Created Tables ' + ret.changes.changes);

    if (ret.changes.changes < 0) {
      console.log('>>> Execute createSchema failed');
      return 0;
    }

    db.close();
    return 1;

  }

  async saveData(user_id:string){
    let db = await this.sqlite.createConnection('app-db',false,'no-encryption',1);
    await db.open();
    console.log('>>> Save Data');
    var sqlcmd = 'INSERT INTO users (user_id) VALUES (?)';
    var values = [user_id];
    let ret:any = await db.run(sqlcmd, values);

    console.log('>>> Save Data Result ' + ret.changes.changes);
    if (ret.changes.changes  !== 1) {
      console.log('Execute save user failed');
      return 0;
    }

    db.close();
    return 1;
  }

  async getData(){
    let db = await this.sqlite.createConnection('app-db',false,'no-encryption',1);
    await db.open();
    console.log('>>> Get user Data');
  
    let ret:any = await db.query('SELECT * FROM users;');

    console.log(">>> User Data : " + ret.values[0].user_id);

    let userId = ret.values[0].user_id;
    if(userId === null || userId === undefined){
      console.log('>>> Failed to fetch data : ' + userId);
      return undefined;
    }

    this.db.close();
    console.log(">>> User Data : " + userId);
    return userId;
  }

  // async initDb(){

  //   this.notificationsService.showLoader('Setting up Database');
  //   console.log('>>>>>>> Creating and opening Database')
  //   this.sqlite.create({ name: 'data.db', location: 'default'}).then((db: SQLiteObject) => {
  //     this.db = db;
  //     this.createTable();
  //     this.notificationsService.dismissLoader();
  //   }).catch(e => console.log(e));
  // }

  // async createTable(){
  //   this.db.executeSql('create table users (user_id VARCHAR(255))', [])
  //   .then(() => console.log('>>>>>>> Executed SQL : Created Table'))
  //   .catch((e: any) => console.log(e));

  //   return true;
  // }

  // async saveData(user_id:any){
  //   this.db.executeSql('INSERT INTO users (user_id) VALUES (?)',[user_id])
  //   .then((res:any) => {
  //     console.log('>>>>>>> Executed SQL : Created Record ' + res)
  //   })
  //   .catch((e:any) => console.log(e))
  // }

  // getData(){
  //   console.log('>>>>>>> Executed SQL : Get Data')
  //   this.db.executeSql('SELECT count(*) As total FROM users',[])
  //   .then((res:any) => {
  //     this.notificationsService.presentToast(JSON.stringify(res));
  //     console.log('>>>>>>> Executed SQL : User data Value ' + res)
  //   })
  //   .catch((e:any) => {
  //     console.log(e);
  //     return undefined;
  //   })
  // }

}
