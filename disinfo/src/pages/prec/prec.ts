import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-prec',
  templateUrl: 'prec.html'
})
export class PrecPage {
Summer: any = [];
  Winter: any=[];
  Fall: any=[];
  Spring : any=[];
  Rainy : any=[];

 sumsel:boolean = false;
 winsel:boolean = false;
 sprsel:boolean = false;
 falsel:boolean = false;
 raisel:boolean = false;

  Sname:any;
  constructor(
           public viewCtrl: ViewController,
           public http: Http,
           public navparams: NavParams
           ) {
    this.http.get('assets/data.json').map(res => res.json()).subscribe(data => 
     {            
                   this.Summer = data.Summer;
                   this.Winter = data.Winter;
                   this.Fall = data.Fall;
                   this.Spring = data.Spring;
                   this.Rainy = data.Rainy;           
      });
       this.Sname = this.navparams.get('name');
    // debugger;
      if(this.Sname == 'Summer'){
      this.sumsel = true;
      this.winsel = false;
      this.sprsel = false;
      this.falsel = false;
      this.raisel = false;
    }
    if(this.Sname == 'Winter'){
      this.sumsel = false;
      this.winsel = true;
      this.sprsel = false;
      this.falsel = false;
      this.raisel = false;
    }
    if(this.Sname == 'Spring'){
      this.sumsel = false;
      this.winsel = false;
      this.sprsel = true;
      this.falsel = false;
      this.raisel = false;
    }
    if(this.Sname == 'Fall'){
      this.sumsel = false;
      this.winsel = false;
      this.sprsel = false;
      this.falsel = true;
      this.raisel = false;
    }
    if(this.Sname == 'Rainy'){
      this.sumsel = false;
      this.winsel = false;
      this.sprsel = false;
      this.falsel = false;
      this.raisel = true;
    }
    
          }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
