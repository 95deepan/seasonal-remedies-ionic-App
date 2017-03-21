import { Component,ViewChild } from '@angular/core';

import { NavController,Slides } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Slides) slides: Slides;

   public query : string = 'summer';
   public newvalue : string ='summer';
  constructor(public navCtrl: NavController) 
  { }
   
   showdata(event){
     if(this.query == 'summer')
     {
       //show summer
       this.newvalue = 'summer';
       this.slides.slideTo(0,0);
     }
     if(this.query == 'winter')
     {
       //show winter
       this.newvalue = 'winter';
       this.slides.slideTo(1,0);
     }
     if(this.query == 'fall')
     {
       //show fall
       this.newvalue = 'fall';
       this.slides.slideTo(2,0);
     }
     if(this.query == 'spring')
     {
       //show spring
       this.newvalue = 'spring';
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
