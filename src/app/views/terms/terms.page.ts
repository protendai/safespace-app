import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { NotificationsService } from 'src/app/services/notifications.service';




@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor( private router: Router, private databaseService:DatabaseService) { }

  ngOnInit() {
    this.databaseService.createTable();
  }

  hasAccepted(){
    this.router.navigate(['/register']);
  }

}
