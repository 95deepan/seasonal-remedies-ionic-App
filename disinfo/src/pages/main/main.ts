import { Component,ViewChild } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NavController,Slides,Platform, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
//import { BackgroundMode } from '@ionic-native/background-mode';
//import { AdMob } from 'ionic-native';
// import { LangPage } from '../lang/lang';
import { LocationPage } from '../location/location';
import { NotifyPage } from '../notify/notify';
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
  showeather:string;
  constructor(
    public navCtrl: NavController,
     public storage: Storage,
      public platform: Platform,
         public loadCtrl : LoadingController,
         public http : Http,
          public alrtCrtl: AlertController,
           public toast:ToastController,
            private nativePageTransitions: NativePageTransitions
      ) 
  {//  this.backgroundMode.enable();

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
                     this.navCtrl.push(LocationPage);
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
   ionViewWillLeave() {

 let options: NativeTransitionOptions = {
    duration: 800,
    slowdownfactor: 5,
    slidePixels: 20,
    iosdelay: 200,
    androiddelay: 150,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
   };
 this.nativePageTransitions.fade(options)
   .then(()=>{
     //  alert("Animated");
       console.log("Succesfully animated");
    }   
   )
   .catch(()=>{
   //  alert("not animated");
     console.log("Not animates");
   });

}

    showreport(){
    //  this.backgroundMode.enable();
      let loading = this.loadCtrl.create({
      content: 'Fetching Current Weather condition...',
      });
      loading.present();
      setTimeout(() => {
      this.weather = "http://api.openweathermap.org/data/2.5/weather?lat="+this.newlat+"&lon="+this.newlon+"&APPID=352e6fd67fd7ed5c99351254c6d2dd5b";
      this.http.get(this.weather).map(res => res.json()).subscribe(data => {
              this.setWeather = data.weather[0].description;
               localStorage.setItem('weather',this.setWeather);
              this.seasonfetch();
              this.showeather = "Since the weather condition is "+ data.weather[0].description +"."; 
              
               let toast = this.toast.create({
                message: 'Precautions shall be taken for the following diseases',
                duration: 2500,
                position: 'top',
                showCloseButton : true,
                closeButtonText: 'ok'
              });
                toast.onDidDismiss(() => {
                 let toast = this.toast.create({
                message: this.showeather,
                duration: 3500,
                position: 'top',
                showCloseButton : true,
                closeButtonText: 'ok'
              });
               toast.onDidDismiss(() => {
                 // if location is not set click ok.
                 if(localStorage.getItem('notifyset')=='false'){
                       let alert = this.alrtCrtl.create({
                   title: 'Alert',
                   subTitle: 'Notification is not set',
                   buttons : [
                     {
                        text: 'Set now',
                        handler: () => {
                          this.navCtrl.push(NotifyPage);
                        }
                     },
                     {
                       text: 'Later',
                       role: 'cancel'
                     }
                   ]
                 });
                 alert.present();
                 }
                 else{
                   return;
                 }
               });
               toast.present();
             });
              toast.present();
            });
         loading.dismiss();
  }, 1000);
  }
  lang(){
    this.navCtrl.push(LocationPage);
  }
  info(id){
      this.navCtrl.push(InfoPage,{name: id});
  }
  cure(id){
     this.navCtrl.push(CurePage,{name: id});
   }
   prec(id){
     this.navCtrl.push(PrecPage,{name: id});
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
         localStorage.setItem('newseason','summer');
         break;

         case 'few clouds':
         this.query = 'summer';
         this.slides.slideTo(0,0);
         localStorage.setItem('newseason','summer');
         break;

         case 'scattered clouds':
         this.query = 'fall';
         this.slides.slideTo(2,0);
         localStorage.setItem('newseason','fall');
         break;

         case 'broken clouds':
         this.query = 'spring';
         this.slides.slideTo(3,0);
         localStorage.setItem('newseason','spring');
         break;

         case 'shower rain':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'light rain':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'rain':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'thunderstorm':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'mist':
         this.query = 'winter';
         this.slides.slideTo(1,0);
         localStorage.setItem('newseason','winter');
         break; 

         case 'snow':
         this.query = 'winter';
         this.slides.slideTo(1,0);
         localStorage.setItem('newseason','winter');
         break;   

         case 'haze':
         this.query = 'summer';
         this.slides.slideTo(0,0);
         localStorage.setItem('newseason','summer');
         break;

         case 'moderate rain':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'heavy intensity rain':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         case 'overcast clouds':
         this.query = 'rainy';
         this.slides.slideTo(4,0);
         localStorage.setItem('newseason','rainy');
         break;

         default:
         this.query = 'summer';
         localStorage.setItem('newseason','summer');
          }   
  }
}
