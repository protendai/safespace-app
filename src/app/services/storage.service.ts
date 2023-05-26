import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { createSchema } from '../utils/db-setup';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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

  // ### Sqlite
  async getConnection(){

    let db;
    let isopen;

    console.log("$$$ checking connection... ");
    let checkConn = await this.sqliteService.isConnection('safespace.db');
    
    console.log("$$$ connection status "+ checkConn.result);

    if(checkConn.result == true){  
      console.log("$$$ closing connections... ");
      db = await this.sqliteService.retrieveConnection('safespace.db');
    }else{
      console.log("$$$ creating connection... ");
      db =  await this.sqliteService.createConnection('safespace.db',false,'no-encryption',1);
    }
    
    isopen = await db.isDBOpen();

    if(isopen.result !== true){ 
      console.log("$$$ opening db... " + isopen.result);
      await db.open();
    } 

    return db;
  }

  async setupDatabase(){
    try {

      console.log('$$$ Setup Database');
      // initialize the connection
      let db = await this.getConnection();

      //  check if user exists
      let user = await this.getUser();

      if(!user){
        // create tables in db
        let ret: any = await db.execute(createSchema);       
        if (ret.changes.changes < 0) { console.log('$$$ create tables in db ' + ret.changes.changes); }
        return false;
      }
      
      return true;

    }catch (err) {
      console.log('$$$ Errors' + err);
      return err;
    }
  }

  async getUser(){
    try {
      // initialize the connection
      let ret:any;
      let db = await this.getConnection();

      // select all users in db
      ret = await db.query('SELECT * FROM users;');
      
      if (ret.values.length === 1) { 
        console.log('$$$ saved user ' + ret.values[0].name +' '+ ret.values[0].surname +' '+ ret.values[0].phone);
      }

      return ret.values[0];
    }catch (err) {
      console.log('$$$ Errors' + err);
    }
  }
  
  async saveUser(user:any){

    try {
      let ret:any;
      let db = await this.getConnection();
      
      // Clear users
      ret = await db.query('DELETE FROM users;');
      // 
      let sqlcmd: string = 'INSERT INTO users (user_id,name,surname,username,phone,email,dob,school,payment) VALUES (?,?,?,?,?,?,?,?,?)';
      let values: Array<any> = [
        user.uuid,
        user.name,
        user.surname,
        user.username,
        user.phone,
        user.email,
        user.dob,
        user.school,
        user.payment_status
      ];
      ret = await db.run(sqlcmd, values);

      // this.getUser();

      console.log("$$$ Save user " + ret.changes.lastId);
      return ret.changes.lastId;
      
    }catch (err) {
      console.log('$$$ Errors' + err);
    }
  }

}
