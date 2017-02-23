import { Component } from '@angular/core';
import { MainPage } from '../main/main';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
    ) {}
     	
    openmain() {
      this.navCtrl.push(MainPage);
    }
    
    loading() {
    let loader = this.loadingCtrl.create({
      content: "Get notified and get cured",
      duration: 1500
    });
    loader.present();
  }
}
   