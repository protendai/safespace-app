import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db:any;

  constructor(private sqlite: SQLite) { }

  initDb(){
    this.sqlite.create({ name: 'data.db', location: 'default'}).then((db: SQLiteObject) => {
      this.db = db;
    }).catch(e => console.log(e));
  }

  setupDB(){

    this.sqlite.create({ name: 'data.db', location: 'default'})
    .then((db: SQLiteObject) => {
      db.executeSql('create table users (user_id VARCHAR(255))', [])
        .then(() => console.log('>>>>>>> Executed SQL'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));

    return true;

  }

  createTable(){
    this.db.executeSql('create table users (user_id VARCHAR(255))', [])
    .then(() => console.log('>>>>>>> Executed SQL : Created Table'))
    .catch((e: any) => console.log(e));

    return true;
  }

  saveData(user_id:any){

    this.db.transaction( (tx:any) => {

      var query = "INSERT INTO users (user_id) VALUES (?)";

      tx.executeSql(query, [user_id], function(res:any) {
          console.log(">>>>>>> insertId: " + res.insertId + " -- probably 1");
          console.log(">>>>>>> rowsAffected: " + res.rowsAffected + " -- should be 1");
      },
      function(error:any) {
          console.log('>>>>>>> INSERT error: ' + error.message);
      });
    }, 
    function(error:any) { console.log('>>>>>>> transaction error: ' + error.message); }, 
    function() { 
      console.log('>>>>>>> transaction ok'); 
      return true;
    }
  );

  }

  getData(){
    this.db.transaction(function (tx:any) {

      var query = "SELECT user_id FROM users";

      tx.executeSql(query, function (resultSet:any) {

          // for(var x = 0; x < resultSet.rows.length; x++) {
          //     console.log(">>>>>>> User ID: " + resultSet.rows.item(x).user_id);
          // }

          return resultSet.rows.item(0).user_id;
      },
      function (error:any) {
          console.log('>>>>>>> SELECT error: ' + error.message);
      });
  }, 
  function (error:any) { console.log('>>>>>>> transaction error: ' + error.message); }, 
  function () { console.log('>>>>>>> transaction ok'); });
  }

}
