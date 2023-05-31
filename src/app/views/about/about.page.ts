import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private router:Router,
    private apiService: ApiService,
    private alertController: AlertController,
    private notificationService: NotificationsService,

    ) { }

  ngOnInit() {
  }

  

  goBack(){
    this.router.navigate(['/tabs']);
  }

}
