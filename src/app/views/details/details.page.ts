import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  item:any;
  constructor(private storageService: StorageService,private navCTRL: NavController) { 
    this.item = this.storageService.getItem();
  }

  ngOnInit() {
  }

  goBack(){
      this.navCTRL.back();
  }

  report(){
    this.navCTRL.navigateForward('/chat');
  }

}
