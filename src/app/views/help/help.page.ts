import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.openBrowser();
  }

  goBack(){
    this.router.navigate(['/login']);
  }

  async openBrowser(){

    await Browser.open({ url: 'http://localhost:8000/help'});
    // await Browser.open({ url: 'https://safespace.stapps.co.za/help'});
  }

}
