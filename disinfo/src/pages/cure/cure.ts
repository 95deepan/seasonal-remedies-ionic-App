import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cure',
  templateUrl: 'cure.html'
})
export class CurePage {
  name:any;
  cure:any;
  constructor(public viewCtrl: ViewController,public navparams: NavParams) {   
                  this.name = this.navparams.get('name');
                  this.cure = this.navparams.get('cureis');
     }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
