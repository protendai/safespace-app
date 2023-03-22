import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-pop',
  templateUrl: './payments-pop.page.html',
  styleUrls: ['./payments-pop.page.scss'],
})
export class PaymentsPopPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs']);
  }


}
