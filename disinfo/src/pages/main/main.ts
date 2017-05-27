import { Component,ViewChild } from '@angular/core';
import { 
  NavController,
  Slides,
  Platform, 
  AlertController, 
  LoadingController,
  ToastController, 
  PopoverController 
} from 'ionic-angular';
// import { LangPage } from '../lang/lang';
import { LocationPage } from '../location/location';
import { NotifyPage } from '../notify/notify';
import { InfoPage } from '../info/info';
import { CurePage } from '../cure/cure';
import { PrecPage } from '../prec/prec';
import { PopoverPage } from '../popover/popover';

import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { AdMob } from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Slides) slides: Slides;
  sum:FirebaseListObservable<any[]>;
  win:FirebaseListObservable<any[]>;
  fal:FirebaseListObservable<any[]>;
  spr:FirebaseListObservable<any[]>;
  rai:FirebaseListObservable<any[]>;

  query : string = 'summer';
  setWeather: any;
  weatherData:any[];
  temp:number;
  revLoc = "";
  address: any;
  newlat: any;
  newlon: any;
  weather = "";
  showeather:string;
  constructor(
    public navCtrl: NavController,
      public platform: Platform,
        public loadCtrl : LoadingController,
         public http : Http,
          public alrtCrtl: AlertController,
           public toast:ToastController,
            public af: AngularFire,
             public popoverctrl: PopoverController
      ) 
  {       
     AdMob.hideBanner();
     this.sum = this.af.database.list('/Summer');
     this.win = this.af.database.list('/Winter');
     this.fal = this.af.database.list('/Fall');
     this.spr = this.af.database.list('/Spring');
     this.rai = this.af.database.list('/Rainy');

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
     else { 
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
              this.weatherData = [];
              this.weatherData = data;
              this.setWeather = data.weather[0].description;
               localStorage.setItem('weather',this.setWeather);
              if(localStorage.getItem("newloc")=="yes"){
                  this.seasonfetch();
              }
              
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
                       role: 'cancel',
                       //set Notification here
                     }
                   ]
                 });
                 alert.present();
                 }
                 else{
                   return;
                 }
               });
               if(localStorage.getItem("newloc")=="yes"){
                 toast.present();
                 localStorage.setItem("newloc","no");
               }
             });
              if(localStorage.getItem("newloc")=="yes"){
                 toast.present();
                
               }
            });
         loading.dismiss();
  }, 1000);
  }
  pop(myevent){
    let popover = this.popoverctrl.create(PopoverPage);
    popover.present({ ev: myevent }); 

    popover.onDidDismiss((item)=>{
       if(item == "Location"){
        let alert = this.alrtCrtl.create({
          title: 'My Location',
          subTitle: localStorage.getItem("location"),
          buttons: [{
            text:'Ok',
            role: 'cancel'
          },
          {
            text: 'Change',
            handler:data=>{
              this.navCtrl.push(LocationPage);
            }
          }
          ]
        });
         alert.present();
       }
       if(item == "Report"){
         console.log("data is",this.weatherData)
         this.temp = this.weatherData.main.temp-273.15;
         var a = parseInt(this.temp);
         var b = this.weatherData.wind.speed/3.6;
         //b = parseInt(b);
         b = Math.round(b*10)/10; 
         let data = "<br><b>Max. Temperature</b>: "+a+"°C<br><br><b>Humidity:</b>"+this.weatherData.main.humidity+" %<br><br><b>Wind:</b>"+b+" Kmph<br><br><b>Weather condition</b>: "+this.weatherData.weather[0].description ;
         let alert = this.alrtCrtl.create({
           title:"<center>Weather Report</center>",
           subTitle:data
         });
         alert.present();
       }
       if(item == "share"){
         alert(item);
       }
    })
  }
  info(id,info){
      this.navCtrl.push(InfoPage,{name: id,infois: info});
  }
  cure(id,cure){
     this.navCtrl.push(CurePage,{name: id,cureis:cure});
   }
   prec(id,prec){
     this.navCtrl.push(PrecPage,{name: id,precis:prec});
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
