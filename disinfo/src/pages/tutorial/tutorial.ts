import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Network } from '@ionic-native/network';

import 'rxjs/add/operator/map';

import { MainPage } from '../main/main';
declare var google;
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  @ViewChild('map') mapElement;
  map: any;
  marker: any;
  revLoc = "";
  address: any;
  newlat: any;
  newlon: any;
  weather = "";
  net: string ;
  constructor(
    public navCtrl: NavController,
     public loadCtrl: LoadingController,
     public alertCtrl: AlertController,
      public http: Http,
       private network: Network
     ) {
       let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
        this.net = "lost" ;
       });
       
       if(this.net == "lost"){
         let alert = this.alertCtrl.create({
          subTitle: 'Please check your internet connection'
        });
        alert.present();
       }
       disconnectSubscription.closed;
     }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){
     let latlng = new google.maps.LatLng(13.0827, 80.2707);
    let mapOptions = {
      center: latlng,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      title: 'My Location',
      position: this.newlat
    });
    google.maps.event.addListener(this.map, 'click', (event) => {
        this.marker.setMap(null);
        this.revLoc = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + event.latLng.lat() + "," + event.latLng.lng() + "&sensor=true";
        this.http.get(this.revLoc).map(res => res.json()).subscribe(data => {
          this.address = data.results[0].formatted_address;
          this.newlat = event.latLng.lat();
          this.newlon = event.latLng.lng();
          localStorage.setItem('userlat',event.latLng.lat());
          localStorage.setItem('userlon',event.latLng.lng());

          this.marker = new google.maps.Marker({
           map: this.map,
           title: 'My Location',
           position: data.results[0].geometry.location
          });
      });
  });
}

locate(){
     let loading = this.loadCtrl.create({
    content: 'Please wait...',
  });

  loading.present();

  setTimeout(() => {
    if(this.revLoc == ""){
       let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'Click here after selecting your location in the Map',
      buttons: ['OK']
    });
    alert.present();
  }   // show location here
  else{
       let latlng2 = new google.maps.LatLng(this.newlat,this.newlon);
       let alert = this.alertCtrl.create({
      title: 'You are here',
      subTitle: this.address,
      buttons: [{
        text:'Confirm',
        handler: data=>{
           this.navCtrl.push(MainPage);
         }
        }], 
    });
    alert.present();
    this.marker = new google.maps.Marker({
      map: this.map,
      title: 'My Location',
      position: latlng2
    });
            
  }
   loading.dismiss();
  }, 800);
}
            // Tracking location by Geolocation services
track(){
  let alert = this.alertCtrl.create({
               subTitle: 'Please make sure that your Location Services is <b>Turned ON<b>',
               buttons: [{
                text:'Ok',
                handler: data=>{
           this.tracking();
         }
        }]
              });
              alert.present();

}
  tracking(){
  let loading = this.loadCtrl.create({
    content: 'Tracking your Location...',
  });

  loading.present();

  setTimeout(() => {
    
  Geolocation.getCurrentPosition()
  .then( 
    (location) => {
      this.newlat = location.coords.latitude;
      this.newlon = location.coords.longitude;
      this.revLoc = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coords.latitude + "," + location.coords.longitude + "&sensor=true";
        this.http.get(this.revLoc).map(res => res.json()).subscribe(data => {
           this.address = data.results[0].formatted_address;  
          localStorage.setItem('userlat',this.newlat);
          localStorage.setItem('userlon',this.newlon);
          let latlng2 = new google.maps.LatLng(this.newlat,this.newlon) ;
         let mapOptions = {
         center: latlng2,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);   
    this.marker = new google.maps.Marker({
           map: this.map,
           title: 'My Location',
           zoom: 16,
           position: latlng2
          }); 
      });
    }
   )    //    If Location services is turned off
  .catch(
    (error) => {
      console.log("Not fetched");
      let alert = this.alertCtrl.create({
      title: 'Sorry !',
      subTitle: 'Please TURN ON the Location Services',
      buttons: ['OK']
    });
    alert.present();
   });
  loading.dismiss();
  }, 800);
}
}
 
 // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
 // http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=352e6fd67fd7ed5c99351254c6d2dd5b