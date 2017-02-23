import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-autumn',
  templateUrl: 'autumn.html'
})
export class AutumnPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutumnPage');
  }
 showAlert1a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Flu viruses</b>',
      subTitle: 'Noone knows about Flu !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Flu !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Flu</b>',
      subTitle: 'Everyone knows about Flu !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Asthma</b>',
      subTitle: 'Everyone knows about Asthma !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'Everyone knows about Asthma !',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Asthma</b>',
      subTitle: 'Everyone knows about Asthma !',
      buttons: ['OK']
    });
    alert.present();
  }
}
