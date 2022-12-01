import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';
import { createSchema } from 'src/app/utils/create-schema';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private httpService: HttpService,
    private notificationService: NotificationsService,
    private router: Router,
    private sqliteService : SqliteService
    ) { }

  ngOnInit() {
  }

  hasAccepted(){
    this.notificationService.showLoader('Registering ...');
      this.apiService.register().subscribe(async (v)=>{
        console.log(v);
        try{
          var resp =  await this.saveToDb(v.success);
          console.log("Response "+ resp);
          this.notificationService.presentToast(resp);
        }catch(e){
          this.notificationService.presentToast(e);
        }
        
      });
  }

  login(){

  }

  async saveToDb(data: string){
    try{
      let db = await this.sqliteService.createConnection(
        'app-db',
        false,
        'no-encryption',
        1,
      );

      console.log(db);

      // open db app-db
      await db.open();

      // create tables in db
      let ret: any = await db.execute(createSchema);
      console.log('$$$ ret.changes.changes in db ' + ret.changes.changes);
      if (ret.changes.changes < 0) {
        return Promise.reject(new Error('Execute createSchema failed'));
      }

      console.log('$$$ Insert data');
      // add two users in db
      // var query = `INSERT INTO users (user_id) VALUES ("5a11afcd-cd6b-4502-88a9-a970164eb514");`
      // var query =  `INSERT INTO users (user_id) VALUES ` + `('Tendai Karuma')`;
      // add one user with statement and values
      var sqlcmd = 'INSERT INTO users (user_id) VALUES (?)';
      var values = [data];
      ret = await db.run(sqlcmd, values);

      console.log(ret.changes.changes);
      if (ret.changes.changes  !== 1) {
        console.log('$$$ ret.changes.changes in db ' + ret.changes.changes);
        return Promise.reject(new Error('Execute save user failed'));
      }

      console.log('$$$ Get all recrords from the table');
      // select the created row
      ret = await db.query('SELECT * FROM users;');
      // 
      console.log("User ID : " + ret.values[0].user_id);
      // 
      await this.sqliteService.closeConnection('app-db');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
    
  }

}
