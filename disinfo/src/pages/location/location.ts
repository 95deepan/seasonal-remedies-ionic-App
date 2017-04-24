import { Component,ViewChild,Renderer } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation,AdMob } from 'ionic-native';
//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import 'rxjs/add/operator/map';

import { MainPage } from '../main/main';
declare var google;
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  @ViewChild('map') mapElement;
  map: any;
  marker: any;
  revLoc = "";
  address: any;
  newlat: any;
  newlon: any;
  weather = "";
  //For searchbar
  showsearch:boolean = false;
  showlist:boolean = false;
  query:string = "";
  address2:any[];
  mylocation:string;

  constructor(
    public navCtrl: NavController,
     public loadCtrl: LoadingController,
     public alertCtrl: AlertController,
      public http: Http,
       public renderer: Renderer,
       // public nativePageTransitions: NativePageTransitions
     ) { let options = { 
              adId : 'ca-app-pub-4733905153068511/9078442787',
              adSize: 'SMART_BANNER',
              isTesting : false
            };
            AdMob.createBanner(options).then(()=>
            {
              AdMob.showBanner(8); 
            })
         
         
  }
  ionViewWillLeave() {
            AdMob.hideBanner();
          }
  ionViewDidLoad() {
    this.initMap();
  
  }
  closesearchbar(){
    this.showsearch = false;
  }
  opensearchbar(){
   this.showsearch = true;
   console.log("It is clicked");
  }
  setloc(){
    let latlng = new google.maps.LatLng(this.newlat,this.newlon);;
    let mapOptions = {
      center: latlng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      title: 'My Location',
      position: latlng
    });
    this.showsearch = false;
  }
  search(){
   this.showlist = true;
    var geocoder = new google.maps.Geocoder();
    let lan, lat;
    geocoder.geocode({ 'address': this.query }, (results, status) => {

      if (status == google.maps.GeocoderStatus.OK) {

        lat = results[0].geometry.location.lat();

        lan = results[0].geometry.location.lng();
        this.newlat = lat;
        this.newlon = lan;
        localStorage.setItem('userlat',lat);
        localStorage.setItem('userlon',lan);
        this.revLoc = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lan + "&sensor=true";
        this.http.get(this.revLoc).map(res => res.json()).subscribe(data => {
          this.address = data.results[0].formatted_address;
          this.mylocation = this.address;
        });

      }
      else{
        this.showlist = false;
      }

    });
  }
  onSearch(event) {
    this.renderer.invokeElementMethod(event.target, 'blur');
    this.search();
  }
  initMap(){
     let latlng = new google.maps.LatLng(13.0827, 80.2707);
    let mapOptions = {
      center: latlng,
      zoom: 5,
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
            if(this.newlat != undefined || this.newlon != undefined){
          let latlng2 = new google.maps.LatLng(this.newlat,this.newlon) ;
         let mapOptions = {
         center: latlng2,
         zoom: 12,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);   
    this.marker = new google.maps.Marker({
           map: this.map,
           title: 'My Location',
           zoom: 12,
           position: latlng2
          }); 
            }
            else{
              let alert = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Either your device <b>does not support</b> this service or location services is <b>Turned off!</b>'
              });
              alert.present();
            }
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