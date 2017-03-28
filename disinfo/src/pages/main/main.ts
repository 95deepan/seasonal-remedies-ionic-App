import { Component,ViewChild } from '@angular/core';
import { LangPage } from '../lang/lang';
import { NavController,Slides,Platform, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { TutorialPage } from '../tutorial/tutorial';
import { Data } from '../../providers/data';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Slides) slides: Slides;
   showinfo:boolean = false;
   showcure:boolean = false;
   showprec:boolean = false;

  Summer: any = [];
  Winter: any=[];
  Fall: any=[];
  Spring : any=[];
  Rainy : any=[];
   public query : string = 'summer';
  setWeather: any;
  revLoc = "";
  address: any;
  newlat: number;
  newlon: number;
  weather = "";
  constructor(
    public navCtrl: NavController,
     public storage: Storage,
      public platform: Platform,
         public loadCtrl : LoadingController,
         public http : Http,
          public alrtCrtl: AlertController,
           public data : Data
      ) 
  { 
     this.http.get('assets/data.json').map(res => res.json()).subscribe(data => 
     {            
                   this.Summer = data.Summer;
                   this.Winter = data.Winter;
                   this.Fall = data.Fall;
                   this.Spring = data.Spring;
                   this.Rainy = data.Rainy;           
      });
      this.newlat = this.data.newlat;
      this.newlon = this.data.newlon;
     console.log("Current user lat is",this.newlat);
     console.log("Current user lon is",this.newlon);
     if(this.newlat == undefined && this.newlon == undefined){
       let alert = this.alrtCrtl.create({
               subTitle: 'Please Set your location',
                  buttons: [{
                    text: 'Skip for now',
                    role:'cancel'
                  },
                  {
                    text:'OK',
                    handler: data=>{
                     this.navCtrl.push(TutorialPage);
                   }
                  }]
                 });
              alert.present(); 
     }
     else{
       this.showreport();
     }          
   }
    showreport(){
      let loading = this.loadCtrl.create({
      content: 'Fetching Current Weather condition...',
      });
      loading.present();
      setTimeout(() => {
      this.weather = "http://api.openweathermap.org/data/2.5/weather?lat="+this.newlat+"&lon="+this.newlon+"&APPID=352e6fd67fd7ed5c99351254c6d2dd5b";
      this.http.get(this.weather).map(res => res.json()).subscribe(data => {
              this.setWeather = data.weather[0].description;
              let alert = this.alrtCrtl.create({
               title: 'Current Weather',
               subTitle: data.weather[0].description,
               buttons: ['OK']
               });
               alert.present();
             });
         loading.dismiss();
  }, 800);
  }
  lang(){
    this.navCtrl.push(LangPage);
  }
  info(){
     this.showcure = false;
     this.showinfo = true;
     this.showprec = false;
  }
   cure(){
     this.showcure = true;
     this.showinfo = false;
     this.showprec = false;
   }
   prec(){
     this.showcure = false;
     this.showinfo = false;
     this.showprec = true;
   }
   close(){
     this.showcure = false;
     this.showinfo = false;
     this.showprec = false;
   }
   showdata(){
     switch(this.query){
       case 'summer':
       this.slides.slideTo(0,0);
       break;
       case 'winter':
       this.slides.slideTo(1,0);
       break;
       case 'fall':
       this.slides.slideTo(2,0);
       break;
       case 'spring':
       this.slides.slideTo(3,0);
       break;
       case 'rainy':
       this.slides.slideTo(4,0);
       break;
       default: this.slides.slideTo(0,0);
     }
   }
   slideChanged(){
       switch(this.slides._activeIndex){
         case 0:
         this.query = 'summer';
         break;
         case 1:
         this.query = 'winter';
         break;
         case 2:
         this.query = 'fall';
         break;
         case 3:
         this.query = 'spring';
         break;
         case 4:
         this.query = 'rainy';
         break;
      
       }
       
     }
  seasonfetch(){
    this.storage.get('weather')
      .then(
        (value)=>
        {   debugger;
          switch(value){
             case 'clear sky':
             this.query = 'summer';
             this.slides.slideTo(0,0);
             break;
             case 'few clouds':
             this.query = 'summer';
             this.slides.slideTo(0,0);
             break;
             case 'scattered clouds':
             this.query = 'fall';
             this.slides.slideTo(2,0);
             break;
             case 'broken clouds':
             this.query = 'spring';
             this.slides.slideTo(3,0);
             break;
             case 'shower rain':
             this.query = 'rainy';
             this.slides.slideTo(4,0);
             break;
             case 'light rain':
             this.query = 'rainy';
             this.slides.slideTo(4,0);
             break;
             case 'rain':
             this.query = 'rainy';
             this.slides.slideTo(4,0);
             break;
             case 'thunderstorm':
             this.query = 'rainy';
             this.slides.slideTo(4,0);
             break;
             case 'snow':
             this.query = 'winter';
             this.slides.slideTo(1,0);
             break;         
             case 'haze':
             this.query = 'summer';
             this.slides.slideTo(0,0);
             break;
             case 'moderate rain':
             this.query = 'rainy';
             this.slides.slideTo(4,0);
             break;
          }
        }
      )
  }
}
