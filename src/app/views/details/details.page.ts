import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  img:string = '';
  title:string = '';
  description:string = '';

  constructor(private storageService: StorageService,private navCTRL: NavController) { 
    this.storageService.get('learn').then((res)=>{
      console.log(JSON.parse(res));
      let item = JSON.parse(res);
     
      this.img = item.img;
      this.title = item.title;
      this.description = item.description;

    });
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
