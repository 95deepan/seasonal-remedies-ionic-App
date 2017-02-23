import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainPage } from '../pages/main/main';
import { SummerPage } from '../pages/summer/summer';
import { WinterPage } from '../pages/winter/winter';
import { SpringPage } from '../pages/spring/spring';
import { AutumnPage } from '../pages/autumn/autumn';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'All Seasons', component: MainPage },
      { title: 'Summer', component: SummerPage },
      { title: 'Winter', component: WinterPage },
      { title: 'Spring', component: SpringPage },
      { title: 'Autumn', component: AutumnPage }
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
}
