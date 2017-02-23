import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-summer',
  templateUrl: 'summer.html'
})
export class SummerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummerPage');
  }
  showAlert1a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Chicken Pox</b>',
      subTitle: '<ul><li>An itchy, red rash is the classic sign of chicken pox.</li><li>It is highly contagious.</li><li>Chickenpox is usually mild but can be very serious.</li><li>Chickenpox is not nearly as common as it used to be.</li><li>The chickenpox vaccine is your best defense against the disease.</li></ul>',
      buttons: ['OK']
    });
    alert.present();
  }
   showAlert1b() {
    let alert = this.alertCtrl.create({
      title: 'How to cure?',
      subTitle: '<ul><li>Use cool wet compresses or give baths in cool or lukewarm water every 3 to 4 hours for the first few days.</li><li>Put calamine lotion on itchy areas.</li><li>Use diphenhydramine for severe itching.</li><li>To avoid bacterial infection,do no scratch the rash.</li><li>Add 2 cups of oatmeal to a lukewarm bath.</li></ul>',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1c() {
    let alert = this.alertCtrl.create({
      title: 'Prevent Chicken Pox',
      subTitle: 'To help prevent chickenpox, kids should receive the chickenpox vaccine when they are 12 to 15 months old, and a booster shot when they are 4 to 6 years old.<br><br>For Adults,try to maintain the optimal body temperature and take vaccine if any person near you got infected.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2a() {
    let alert = this.alertCtrl.create({
      title: '<b>About Conjunctivitis</b>',
      subTitle: 'Conjunctivitis is an inflammation of the conjunctiva, the tissue covering the eye and inner surface of the eyelid. It can be infectious (mainly caused by bacteria or viruses) or noninfectious. The common types of noninfectious conjunctivitis are allergic conjunctivitis (caused by an allergic reaction) and irritant conjunctivitis (caused by anything that irritates the eyes, such as air pollution or chlorine in pools)',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2b() {
    let alert = this.alertCtrl.create({
      title: '<b>How to cure?</b>',
      subTitle: 'If a virus is causing conjunctivitis, antibiotic drops will not help. The eye infection will get better as the body fights off the virus.<br><br>If you have allergic conjunctivitis, your doctor may prescribe anti-allergy medication in pill or eyedrop form.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2c() {
    let alert = this.alertCtrl.create({
      title: '<b>Prevent Conjunctivitis</b>',
      subTitle: 'Do not share potentially infected items like washcloths, towels, gauze, or cotton balls. This can be difficult among family members, so just do the best you can.',
      buttons: ['OK']
    });
    alert.present();
  }
}
  