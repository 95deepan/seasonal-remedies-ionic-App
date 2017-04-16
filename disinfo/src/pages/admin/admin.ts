import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { AdMob } from 'ionic-native';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  messages:FirebaseListObservable<any[]>;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public af: AngularFire,
       public loadctrl: LoadingController,
        public alertCtrl: AlertController
      ) {
           let options = {
              adId : 'ca-app-pub-3940256099942544/6300978111',
              adSize: 'SMART_BANNER',
              isTesting : false
            };
            AdMob.createBanner(options).then(()=>
            {
              AdMob.showBanner(8); 
            })
      }
  
  ionViewDidLoad() {
     let loading = this.loadctrl.create({
      content: 'Please wait...'
    });
    loading.present().then(() => {
    this.messages = this.af.database.list('/data');
  });
   setTimeout(
      ()=>{
      loading.dismiss();
      },3000
    );
  }
  delete(id){
       let prompt = this.alertCtrl.create({
      title: 'Delete message?',
      buttons:[
        {
          text: 'Cancel',
          role:'cancel'
        },
        {
          text:'Delete',
          handler: data=>{
            this.messages.remove(id);
          }
        }
      ]
    })
    prompt.present();
  }
}
