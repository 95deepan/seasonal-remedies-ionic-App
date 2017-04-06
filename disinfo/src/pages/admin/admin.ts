import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

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
      ) {}
  
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
