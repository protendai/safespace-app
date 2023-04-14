import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
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
    img:'../../../assets/images/1.png',
    title:'Are you being bullied?',
    description:'Bullying unwanted, aggressive behaviour among school-aged children that involves a real or perceived power imbalance. This usually happens face-to-face or online (cyberbullying)',
   },
   {
    img:'../../../assets/images/2.png',
    title:'Is someone giving you a hard time online?',
    description:'Cyberbullying is bullying that happens online usually done via instant messaging, emails, chatrooms, direct calls, and social media platforms such as Facebook, Instagram, Twitter, TikTok, Snapchat etc. It is usually done with the intention to harass, threaten or intimidate another person.',
   },
   {
    img:'../../../assets/images/3.png',
    title:'Are you being harassed by anyone at home or at school?',
    description:'Harassment is any unwanted behaviour, physical or verbal, that makes a  person feel uncomfortable, humiliated, or mentally distressed.',
   },
   {
    img:'../../../assets/images/1.png',
    title:'Is anyone trying to make you angry or mad on purpose?',
    description:'Trolling is the deliberate act of provoking a response by using provocative language in an online forum to incite someone to anger.',
   },
   {
    img:'../../../assets/images/2.png',
    title:'Are you being threatened in any way by someone?',
    description:'Exploitation can involve the coercing of a victim into performing sexual acts, threatening to post and broadcast another person\'s nude pictures without consent, and exposing children to pornography.',
   },
   {
    img:'../../../assets/images/3.png',
    title:'Are you being harrased by someone online?',
    description:'Online Harm is user-generated content or behaviour that can cause significant physical or psychological harm to a person. This can include child sexual exploitation and abuse, hate speech, harassment, cyberbullying and online abuse.',
   }
  ];
  constructor(
    private httpService: HttpService,
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private databaseService:DatabaseService
    ) { 
    }

  ngOnInit() {
    this.httpService.getAuthKey();
    this.quote = this.apiService.getQuotes();
    this.databaseService.getData();
  }

  learnMore(item: any){
    this.storageService.setItem(item);
    this.router.navigate(['details'])
  }

}
