import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TellPage } from '../pages/tell/tell';
import { RatePage } from '../pages/rate/rate';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string,color: any}>;

  constructor(public platform: Platform,public storage: Storage) {
    this.initializeApp();
      this.storage.get('hasSeenSlides')
      .then((hasSeenSlides) => {
        if (hasSeenSlides) {
          this.rootPage = MainPage;
        } else {
          this.rootPage = HomePage;
        }
        this.platformReady()
      })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MainPage, icon : 'home',color: "danger" },
      { title: 'App Tutorial', component: TutorialPage,icon : 'md-help',color: "secondary" },
      { title: 'Set Time', component: AboutPage,icon : 'md-time',color: "primary" },
      { title: 'Tell Us', component: TellPage,icon : 'md-mail',color: "" },
      { title: 'Rate Us', component: RatePage,icon : 'ios-star',color: "danger" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
   platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
    });
  }
}
