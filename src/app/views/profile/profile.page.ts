import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any;
  constructor(private storaeService: StorageService) {
    this.getUser();
   }

  ngOnInit() {
    
  }

  async getUser(){
    var data  =  await this.storaeService.get('user');
    this.user = JSON.parse(data);
    console.log(this.user);
  }

}
