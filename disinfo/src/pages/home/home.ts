import { Component, ViewChild } from '@angular/core';
import { MainPage } from '../main/main';
import { NavController,Slides } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AdMob } from 'ionic-native';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild(Slides) slides: Slides;
 anim:boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public storage:Storage
    ) {
     localStorage.setItem('notifyset','false');
     AdMob.hideBanner();
    }
     	
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
  go(){
    this.slides.slideTo(1,0);
    this.anim = true;
  }
  goto(){
    this.slides.slideTo(2,0);
  }
}
   