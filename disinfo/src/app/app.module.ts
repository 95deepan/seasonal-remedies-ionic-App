import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
//import { TranslateModule , TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import { NativePageTransitions } from '@ionic-native/native-page-transitions'; 
//import { Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { Network } from '@ionic-native/network';
import { BackgroundMode } from '@ionic-native/background-mode';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { AboutPage } from '../pages/about/about';
import { TellPage } from '../pages/tell/tell';
import { RatePage } from '../pages/rate/rate';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LangPage } from '../pages/lang/lang';
import { InfoPage } from '../pages/info/info';
import { CurePage } from '../pages/cure/cure';
import { PrecPage } from '../pages/prec/prec';
import { AdminPage } from '../pages/admin/admin';

import { Data } from '../providers/data';
// import { LanguageService } from '../providers/language.service';

export function provideStorage() {
   return new Storage();
 }
/* export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}  */

export const firebaseConfig = {
    apiKey: "AIzaSyC3k-OBD2X4tihUN-lvOOuySNNDGZ41QF8",
    authDomain: "seasonal-a28ac.firebaseapp.com",
    databaseURL: "https://seasonal-a28ac.firebaseio.com",
    projectId: "seasonal-a28ac",
    storageBucket: "seasonal-a28ac.appspot.com",
    messagingSenderId: "622614305839"
};

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    HomePage,
    AboutPage,
    TellPage,
    RatePage,
    TutorialPage,
    LangPage,
    InfoPage,
    CurePage,
    PrecPage,
    AdminPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
   /* TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http],
  }) */
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    HomePage,
    AboutPage,
    TellPage,
    RatePage,
    TutorialPage,
    LangPage,
    InfoPage,
    CurePage,
    PrecPage,
    AdminPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Storage, useFactory: provideStorage},
            //  LanguageService,
              Data,
              Network,
              BackgroundMode,
              InAppBrowser,
              NativePageTransitions
              ]
})
export class AppModule {}
