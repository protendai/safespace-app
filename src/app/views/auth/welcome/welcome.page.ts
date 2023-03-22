import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  status: any;

  constructor(private router:Router,private activatedRoute: ActivatedRoute,
    private notifications: NotificationsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('status')) {
        this.router.navigate(['/']);
      }
      this.status = paramMap.get('status');
      console.log(this.status);
    });

    this.notifications.presentAlert('Notice','Please remember to save your password somehwere safe. If you lose your password please contact support')
  }

  gotToHome(){
    this.router.navigate(['tabs']);
  }

}
