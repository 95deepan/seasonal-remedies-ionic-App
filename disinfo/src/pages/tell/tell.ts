import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-tell',
  templateUrl: 'tell.html'
})
export class TellPage {
  email:any = "" ;
  message:any = "";

  data: FirebaseListObservable<any[]>;
  constructor(
          public navCtrl: NavController,
           public navParams: NavParams,
            public angfire: AngularFire,
             public alrt: AlertController,
              public loadingCtrl: LoadingController
            ) {
                this.data = this.angfire.database.list('/data');
            }
submit(){
     let alert =  this.alrt.create({
                   title: 'Thank you for your feedback!',
                   subTitle: 'We will contact you shortly after reviewing you message.',
                   buttons: ['OK']
                });
let loading = this.loadingCtrl.create({
      content: 'Plese wait...',
      });
      loading.present();
      setTimeout(() => {
  this.data.push({
    email: this.email,
    message: this.message
  }).then(
    ()=>{
      alert.present();
      this.email = "",
      this.message = ""
    }
  )
    loading.dismiss();
  }, 800);
}

}
