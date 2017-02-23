import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-winter',
  templateUrl: 'winter.html'
})
export class WinterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinterPage');
  }
  showAlert1a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Fever</b>',
      subTitle: 'Everyone knows about Fever !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Fever !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Fever</b>',
      subTitle: 'Everyone knows about Fever !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Common cold</b>',
      subTitle: 'Everyone knows about Common cold !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Common cold !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Common cold</b>',
      subTitle: 'Everyone knows about Common cold !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Mosquito Bite</b>',
      subTitle: 'Everyone knows about Mosquito Bite !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Mosquito Bite !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Mosquito Bite</b>',
      subTitle: 'Everyone knows about Mosquito Bite !',
      buttons: ['OK']
    });
    alert.present();
  }
}
