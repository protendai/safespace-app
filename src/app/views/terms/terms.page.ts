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
      this.apiService.register().subscribe((v)=>{
        console.log(v);
        try{
          var resp = this.saveToDb(v.success);
          console.log(resp);
          this.notificationService.presentToast(resp);
        }catch(e){
          this.notificationService.presentToast(e);
        }
        
      });
  }

  login(){

  }

  async saveToDb(data: string){
    
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

    console.log('$$$ Delete all users and Insert data');
    // add two users in db
    var query = 'INSERT INTO users (user_id) VALUES ("5a11afcd-cd6b-4502-88a9-a970164eb514");'
    ret = await db.execute(query);
    if (ret.changes.lastId  !== 1) {
      console.log('$$$ ret.changes.changes in db ' + ret.changes.lastId);
      return Promise.reject(new Error('Execute save user-id failed'));
    }

    console.log('$$$ Get all recrords from the table');
    // select the created row
    ret = await db.query('SELECT * FROM users;');
    // 
    console.log(ret.changes);
    // 
    return ret;
    
  }

}
