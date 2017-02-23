import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-spring',
  templateUrl: 'spring.html'
})
export class SpringPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpringPage');
  }
  showAlert1a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Dark Circles</b>',
      subTitle: 'Everyone knows about Dark Circles !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Dark Circles !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Dark Circles</b>',
      subTitle: 'Everyone knows about Dark Circles !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Throat Itching</b>',
      subTitle: 'Everyone knows about Throat Itching !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Throat Itching !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Throat Itching</b>',
      subTitle: 'Everyone knows about Throat Itching !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Nasal Congestion</b>',
      subTitle: 'Everyone knows about Nasal Congestion !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Nasal Congestion !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Nasal Congestion</b>',
      subTitle: 'Everyone knows about Nasal Congestion !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert4a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Runny Nose</b>',
      subTitle: 'Everyone knows about Runny Nose !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert4b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Runny Nose !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert4c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Runny Nose</b>',
      subTitle: 'Everyone knows about Runny Nose !',
      buttons: ['OK']
    });
    alert.present();
  }
}
