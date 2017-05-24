import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  info:any;
  name:any;
  constructor( public navparams: NavParams,public viewCtrl: ViewController ) {
              this.name = this.navparams.get('name');
              this.info = this.navparams.get('infois');
          }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
