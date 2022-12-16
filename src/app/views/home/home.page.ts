import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  quote:any;
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
  constructor(
    private httpService: HttpService,
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    ) { 
      this.quote = this.apiService.getQuotes();
    }

  ngOnInit() {
    this.httpService.getAuthKey();
    this.quote = this.apiService.getQuotes();
  }

  learnMore(item: any){
    this.storageService.setItem(item);
    this.router.navigate(['details'])
  }



}
