import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMob } from 'ionic-native';

@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html'
})
export class RatePage {

  one:boolean = false;
  two:boolean = false;
  three:boolean = false;
  four:boolean = false;
  five:boolean = false;

  showsubmit:boolean = false;

  constructor(
    public navCtrl: NavController,
     private iab: InAppBrowser
     ) {}
  ionViewDidLoad() {
    let options = {
              adId : 'ca-app-pub-3940256099942544/6300978111',
              adSize: 'SMART_BANNER',
              isTesting : false
            };
            AdMob.createBanner(options).then(()=>
            {
              AdMob.showBanner(8); 
            })
  }

  one1(){
    this.one = true;
    this.two = false;
    this.three = false;
    this.four = false;
    this.five = false;
    this.showsubmit = true;
  }
  two2(){
    this.one = true;
    this.two = true;
    this.three = false;
    this.four = false;
    this.five = false;
    this.showsubmit = true;
  }
  three3(){
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = false;
    this.five = false;
    this.showsubmit = true;
  }
  four4(){
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = true;
    this.five = false;
    this.showsubmit = true;
  }
  five5(){
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = true;
    this.five = true;
    this.showsubmit = true;
  }
  submit(){
    console.log("it is clicked");
    this.iab.create('https://ionic.io');
   // new InAppBrowser('https://ionic.io','_blank'); 
  }
}
