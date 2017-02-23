import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SummerPage } from '../summer/summer';
import { WinterPage } from '../winter/winter';
import { SpringPage } from '../spring/spring';
import { AutumnPage } from '../autumn/autumn';
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController) 
  {}
  opensummer() {
      this.navCtrl.push(SummerPage);
    }
   openwinter() {
      this.navCtrl.push(WinterPage);
    }
    openspring() {
      this.navCtrl.push(SpringPage);
    }
    openautumn() {
      this.navCtrl.push(AutumnPage);
    }
}
