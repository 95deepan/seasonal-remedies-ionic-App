import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*

  Tamil:
    summer : வெயில்
    winter : குளிர்
    fall   : இலையுதிர்
    spring : வசந்த காலம்
    rainy  : மழை

*/
@Component({
  selector: 'page-tell',
  templateUrl: 'tell.html'
})
export class TellPage {
  Summer: any = [];
  Winter: any=[];
  Fall: any=[];
  Spring : any=[];
  Rainy : any=[];
  constructor(
          public navCtrl: NavController,
           public navParams: NavParams,
            ) {
                
            }

}
