import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-prec',
  templateUrl: 'prec.html'
})
export class PrecPage {
  name:any;
  prec:any;
  constructor(public viewCtrl: ViewController, public navparams: NavParams) {
              this.name = this.navparams.get('name');
              this.prec = this.navparams.get('precis');    
          }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
