import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { createSchema } from '../utils/create-schema';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private item = [];
  constructor(private sqliteService: SqliteService) { }

  async store(storageKey: string, val: any){
    await Preferences.set({
      key: storageKey,
      value: JSON.stringify(val),
    });
  }

  async get(storageKey: string){
    const res:any = await Preferences.get({key: storageKey});
    if(res){
      return res.value;
    }else{
      return false;
    }
  }

  async removeItem(storageKey: string){
    await Preferences.remove({key: storageKey});
  }

  async clear(){
    await Preferences.clear();
  }

  async createDb(){
    
      try{
        // Check if Database exists
        let res = await this.sqliteService.isDatabase('app-db');
        if(res.result === true){
          // this.sqliteService.deleteOldDatabases("",["app-db"]);
          return true;
        }
        // Connect to DB and create new
        let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);

        // open db app-db
        await db.open();

        // create tables in db
        let ret: any = await db.execute(createSchema);
        console.log('$$$ changes in db ' + ret.changes.changes);
        if (ret.changes.changes < 0) {
          return Promise.reject(new Error('Execute createSchema failed'));
        }
        // Close connection
        await this.sqliteService.closeConnection('app-db');
        // if not errors return true
        return true;
      }catch(e){
        return false;
      }
  }
  
  async saveToDb(data: string){
    try{
      
      let dbConnect = await this.createDb();
      if(dbConnect !== true){
        return "Error failed to connect to db";
      }
      let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
     
      await db.open();

      console.log('$$$ Insert data');
      var sqlcmd = 'INSERT INTO users (user_id) VALUES (?)';
      var values = [data];
      let ret:any = await db.run(sqlcmd, values);

      console.log(ret.changes.changes);
      if (ret.changes.changes  !== 1) {
        console.log('$$$ changes in db ' + ret.changes.changes);
        return Promise.reject(new Error('Execute save user failed'));
      }

      ret = await this.sqliteService.closeConnection('app-db');

      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getFromDb(){
    try{
      console.log("check if database exists");
      let db = await this.sqliteService.createConnection('app-db',false,'no-encryption',1);
      // open db app-db
      await db.open();
      // select the created row
      let ret:any = await db.query('SELECT * FROM users;');
      // console log ID
      console.log("User ID : " + ret.values[0].user_id);
      // close connection to DB
      ret = await this.sqliteService.closeConnection('app-db');
      //  return user id
      return ret.values[0].user_id;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Get Set
  setItem(item: never[]){this.item = item;}
  getItem(){ return this.item;}
}
