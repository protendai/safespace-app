import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(private navCtrl: NavController,private router:Router,private storageService:StorageService) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.back();
  }

  downloads(){
    this.router.navigate(['tabs/downloaded']);
  }

  logout(){
    this.storageService.clear();
    this.storageService.deleteDB();
    this.router.navigate(['/landing']);
  }

}
