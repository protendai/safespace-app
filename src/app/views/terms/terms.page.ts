import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';




@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor( private router: Router,private notificataionService: NotificationsService) { }

  ngOnInit() {
    this.notificataionService.initPush();
  }

  hasAccepted(){
    this.router.navigate(['/register']);
  }

}
