import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items = [
   {
    img:'../../../assets/images/cb.png',
    title:'Are you being bullied on your phone?',
    description:'Cyberstalking- this is when someone repeatedly harasses, intimidates and threatens someone. Many cases of cyberstalking usually involve predators grooming teenagers to have sexual relationships with them',
   },
   {
    img:'../../../assets/images/cb.png',
    title:'Is someone pretending to be you to others?',
    description:'Impersonation- this can involve the creation of fake social media accounts or profiles to impersonate the victim with intention of tarnishing someones reputation',
   },
   {
    img:'../../../assets/images/cb.png',
    title:'Are you being physically harmed by someone?',
    description:'Impersonation- this can involve the creation of fake social media accounts or profiles to impersonate the victim with intention of tarnishing someones reputation',
   }
  ];
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
  }

  learnMore(item: any){
    this.storageService.setItem(item);
    this.router.navigate(['details'])
  }

}
