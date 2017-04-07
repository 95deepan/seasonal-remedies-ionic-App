import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  ionViewDidLoad() {}

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
  }
}
