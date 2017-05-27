import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';




import { AngularFireModule } from 'angularfire2';
//import { TranslateModule , TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';

//********NATIVE COMPONENTS
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';

//*********PAGES
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { NotifyPage } from '../pages/notify/notify';
import { TellPage } from '../pages/tell/tell';
//import { RatePage } from '../pages/rate/rate';
import { LocationPage } from '../pages/location/location';
import { LangPage } from '../pages/lang/lang';
import { InfoPage } from '../pages/info/info';
import { CurePage } from '../pages/cure/cure';
import { PrecPage } from '../pages/prec/prec';
import { AdminPage } from '../pages/admin/admin';

//**********PROVIDERS
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
    NotifyPage,
    TellPage,
    LocationPage,
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
    NotifyPage,
    TellPage,
    LocationPage,
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
           //   Network, 
          //    BackgroundMode,
              AppRate,
              SocialSharing
              ]
})
export class AppModule {}
