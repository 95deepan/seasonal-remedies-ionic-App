import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TranslateModule , TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { AboutPage } from '../pages/about/about';
import { TellPage } from '../pages/tell/tell';
import { RatePage } from '../pages/rate/rate';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LangPage } from '../pages/lang/lang';

import { Data } from '../providers/data';
import { LanguageService } from '../providers/language.service';

export function provideStorage() {
   return new Storage();
 }
export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    MainPage,
    HomePage,
    AboutPage,
    TellPage,
    RatePage,
    TutorialPage,
    LangPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  })
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
    LangPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Storage, useFactory: provideStorage},
              LanguageService,
              Data
              ]
})
export class AppModule {}
