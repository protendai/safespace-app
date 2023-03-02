import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  status: any;

  constructor(private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('status')) {
        this.router.navigate(['/']);
      }
      this.status = paramMap.get('status');
      console.log(this.status);
    });
  }

  gotToHome(){
    this.router.navigate(['tabs']);
  }

}
