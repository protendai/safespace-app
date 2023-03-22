import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payments-pop',
  templateUrl: './payments-pop.page.html',
  styleUrls: ['./payments-pop.page.scss'],
})
export class PaymentsPopPage implements OnInit {

  public data = {
    type:'',
    names:'',
    phone:'',
    pop:'',
  };

  constructor(
    private router:Router,
    private apiService: ApiService,
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private sqliteService : SqliteService,
    private databaseService: DatabaseService
    ) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }

  upload(){
 
     console.log(this.data);

      // if(this.data.names === "" || this.data.pop === "" || this.data.phone === ""){
      //   this.notificationService.presentAlert("Registration failed","Please fill in all required fields");
      // }else{
      //   console.log(this.data);
       
      //   this.notificationService.showLoader('Registering ...');
      //   this.apiService.register(this.data).subscribe(async (v)=>{
      //     this.notificationService.dismissLoader();
      //     console.log(v);
   
      //       if(v.success){
      //         console.log(v.success);
      //       }
          
      //   },(error) => {
      //     console.log(error.error);
      //     this.notificationService.dismissLoader();
      //     this.notificationService.presentAlert("Registration failed","Please try again");
      //   });
    
      // }

  }


}
