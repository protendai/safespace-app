import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private router:Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  logout(){
    this.apiService.logout();
    this.router.navigate(['login']);
 }

}
