import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private storageService: StorageService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.storageService.clear();
    this.router.navigate(['login']);
 }

}
