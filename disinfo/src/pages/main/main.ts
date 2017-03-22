import { Component,ViewChild } from '@angular/core';

import { NavController,Slides } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Slides) slides: Slides;
   
   Summer: Array<{title: string}>;
   Winter: Array<{title: string}>;
   Fall: Array<{title: string}>;
   Spring: Array<{title: string}>;
   public query : string = 'summer';
  constructor(public navCtrl: NavController) 
  { 
    this.Summer = [
      {title: 'Typhoid'},{title: 'Chicken Pox'},{title: 'Jaundice'},{title: 'HeadAche'},
      {title: 'Skin Rashes'},{title: 'Back Pain'},{title: 'Measles'},{title: 'Mumps'},
      {title: 'Flu'},{title: 'Conjunctivitis'}
    ];
    this.Winter = [
      {title:'Common Cold'},{title:'Sore Throat'},{title:'Asthma'},{title:'Noro Virus'},
      {title:'Painful Joints'},{title:'Cold Sores'},{title:'Heart Attacks'},{title:'Cold HAnds'},
      {title:'Dry Skin'},{title:'Fever'}
    ];
    this.Fall = [
      {title:'Sore Throat'},{title:'Allergic Asthma'},{title:'Stomach Ulcer'},
      {title:'Heart Failure'},{title:'Pink eye'}
    ];
    this.Spring = [
      {title:'Dark Circles Around Eyes'},{title:'Throat Itching'},{title:'Nasal Congestion'},
      {title:'Clear Runny Nose'},{title:'Flu'}
    ]
   }
   
   showdata(){
     if(this.query == 'summer')
     {
       this.slides.slideTo(0,0);
     }
     if(this.query == 'winter')
     {      
       this.slides.slideTo(1,0);
     }
     if(this.query == 'fall')
     {     
       this.slides.slideTo(2,0);
     }
     if(this.query == 'spring')
     {
       this.slides.slideTo(3,0);
     }
   }
   slideChanged(){
       if(this.slides._activeIndex == 0){
           this.query = 'summer';
       }
       if(this.slides._activeIndex == 1){
           this.query = 'winter';
       }
       if(this.slides._activeIndex == 2){
           this.query = 'fall';
       }
       if(this.slides._activeIndex == 3){
           this.query = 'spring';
       }
     }
  /*opensummer() {
      this.navCtrl.push(SummerPage);
    }
   openwinter() {
      this.navCtrl.push(WinterPage);
    }
    openspring() {
      this.navCtrl.push(SpringPage);
    }
    openautumn() {
      this.navCtrl.push(AutumnPage);
    }
    */
}
