import { Component } from '@angular/core';
import { MainPage } from '../main/main';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public storage:Storage
    ) {}
     	
    openmain() {
      this.navCtrl.push(MainPage).then(() => {
      this.storage.set('hasSeenSlides', 'true');
    })
    }
    
    loading() {
    let loader = this.loadingCtrl.create({
      content: "Welcome...",
      duration: 1500
    });
    loader.present();
  }
}
   