import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

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
    private router: Router
    ) { }

  ngOnInit() {
  }

  hasAccepted(){
    this.notificationService.showLoader('Login in ...');
  
      this.apiService.register().subscribe((res: any)=> {
        if(res){
          this.storageService.store('id', res.access_token);
          this.storageService.store('user', res.user);
          
          this.notificationService.dismissLoader();
          this.router.navigate(['tabs']);
        }
      },
      (error: any) =>{
        this.notificationService.dismissLoader();
        this.notificationService.presentToast(error);
      }
      );
  }

}
