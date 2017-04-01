import { Component,ViewChild } from '@angular/core';
//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NavController,Slides,Platform, AlertController, LoadingController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LangPage } from '../lang/lang';
import { TutorialPage } from '../tutorial/tutorial';
import { InfoPage } from '../info/info';
import { CurePage } from '../cure/cure';
import { PrecPage } from '../prec/prec';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Slides) slides: Slides;
   
  Summer: any = [];
  Winter: any=[];
  Fall: any=[];
  Spring : any=[];
  Rainy : any=[];
  query : string = 'summer';
  setWeather: any;
  revLoc = "";
  address: any;
  newlat: any;
  newlon: any;
  weather = "";
  constructor(
    public navCtrl: NavController,
     public storage: Storage,
      public platform: Platform,
         public loadCtrl : LoadingController,
         public http : Http,
          public alrtCrtl: AlertController,
           public modalCtrl : ModalController

         //  private nativePageTransitions: NativePageTransitions
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
       this.newlat = localStorage.getItem('userlat');
       this.newlon = localStorage.getItem('userlon');
       if(this.newlat == undefined && this.newlon == undefined){
       let alert = this.alrtCrtl.create({
               subTitle: 'Please Set your location',
                  buttons: [{
                    text:'OK',
                    handler: data=>{
                     this.navCtrl.push(TutorialPage);
                   }
                  },{
                    text: 'Skip',
                    role:'cancel'
                  }
                  ]
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
              this.seasonfetch();
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
     let modal = this.modalCtrl.create(InfoPage);
     modal.present();    
  }
  cure(){
     this.navCtrl.push(CurePage);
   }
   prec(){
     this.navCtrl.push(PrecPage);
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
       switch(this.setWeather){
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
         case 'mist':
         this.query = 'winter';
         this.slides.slideTo(1,0);
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
         default:
         this.query = 'summer';
          }   
  }
}
