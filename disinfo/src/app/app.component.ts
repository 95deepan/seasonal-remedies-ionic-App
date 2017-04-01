import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TellPage } from '../pages/tell/tell';
import { RatePage } from '../pages/rate/rate';
import { LangPage } from '../pages/lang/lang';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TranslateService } from 'ng2-translate';
import { LanguageService } from '../providers/language.service';
import { LanguageModel } from "../models/language.model";
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 // textDir: string = "ltr";
  rootPage: any;
  languageSelected : any = 'en';
  languages : Array<LanguageModel>;
  pages: Array<{title: string, component: any, icon: string,color: any}>;

  constructor(
    public platform: Platform,
     public storage: Storage,
      public translate: TranslateService,
       public languageService: LanguageService) {
         translate.setDefaultLang('en');  
    translate.use('en');
    this.languages = this.languageService.getLanguages();  
    this.translate.setDefaultLang(this.languageSelected);
    this.translate.use(this.languageSelected);
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
      { title: 'Home', component: MainPage, icon : 'home',color: "home" },
      { title: 'Set Location', component: TutorialPage,icon : 'ios-pin',color: "location" },
      { title: 'Manage Notifications', component: AboutPage,icon : 'md-notifications',color: "notification" },
      { title: 'Change Language', component: LangPage,icon : 'ios-globe-outline',color: "secondary" },
      { title: 'Tell Us', component: TellPage,icon : 'md-mail',color: "tell" },
      { title: 'Rate Us', component: RatePage,icon : 'ios-star',color: "notification" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      Splashscreen.hide();
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(true); // let status bar overlay webview
      StatusBar.backgroundColorByHexString('#bc6e2b');
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
