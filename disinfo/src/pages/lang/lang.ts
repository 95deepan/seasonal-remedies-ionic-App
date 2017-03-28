import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';

import { MainPage } from '../main/main';

@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html'
})
export class LangPage {

 languages: Array<LanguageModel>;
 languageSelected: any = 'en';
  constructor( 
              public navCtrl: NavController,
               public translate: TranslateService,
                public languageService: LanguageService,
                 public storage: Storage 
              ) {
                this.languages = this.languageService.getLanguages(); 
                    
              }

    setLanguage() {
    this.translate.setDefaultLang(this.languageSelected);
    this.translate.use(this.languageSelected);
    this.storage.set('language',this.languageSelected);
    this.navCtrl.push(MainPage);
  }

}
