import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Storage } from '@ionic/storage';
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
  setWeather: any;
  revLoc = "";
  address: any;
  newlat: number;
  newlon: number;
  weather = "";
  constructor(
    public navCtrl: NavController,
     public loadCtrl: LoadingController,
     public alertCtrl: AlertController,
      public http: Http,
       public storage: Storage
     ) {}

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
        // if(this.temp !=0){
        this.marker.setMap(null);
        // } 
        //geocodePosition(this.marker.getPosition());
        console.log("lat", event.latLng.lat());
        console.log("lon", event.latLng.lng());
        this.revLoc = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + event.latLng.lat() + "," + event.latLng.lng() + "&sensor=true";
        this.http.get(this.revLoc).map(res => res.json()).subscribe(data => {
          console.log("revloc", data);
           debugger;          
          console.log("reverse location", data.results[0].formatted_address);
          console.log("reverse location geometry", data.results[0].geometry.location);
          this.address = data.results[0].formatted_address;
          this.newlat = event.latLng.lat();
          this.newlon = event.latLng.lng();
          this.storage.set('userlat',this.newlat);
          this.storage.set('userlan',this.newlon);
          console.log("Stored lat is",this.newlat);
          console.log("Stored lon is",this.newlon);

          this.marker = new google.maps.Marker({
           map: this.map,
           title: 'My Location',
           position: data.results[0].geometry.location
          });
    });
  });
}
             // To show/fetch the result of open weather
  showreport(){
    let loading = this.loadCtrl.create({
    content: 'Fetching current weather condition...',
  });

  loading.present();
  setTimeout(() => {
      this.weather = "http://api.openweathermap.org/data/2.5/weather?lat="+this.newlat+"&lon="+this.newlon+"&APPID=352e6fd67fd7ed5c99351254c6d2dd5b";
        this.http.get(this.weather).map(res => res.json()).subscribe(data => {
            console.log("Raw data is",data);
            console.log("Current weather is",data.weather[0].description);
          /*   */
              this.storage.set('weather',data.weather[0].description);
              this.setWeather = data.weather[0].description;
             });
         this.navCtrl.push(MainPage);
         loading.dismiss();
  }, 800);
  }
    //    After submit button clicked if(select location),else(show location)  
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
           this.storage.set('userlat',this.newlat);
           this.storage.set('userlan',this.newlon);
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
          this.marker = new google.maps.Marker({
           map: this.map,
           title: 'My Location',
           zoom: 16,
           position: data.results[0].geometry.location
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
    } 
  );
  loading.dismiss();
  }, 800);
}
}
 
 // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
 // http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=352e6fd67fd7ed5c99351254c6d2dd5b