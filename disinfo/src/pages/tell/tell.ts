import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { EmailValidator } from '../../providers/email';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-tell',
  templateUrl: 'tell.html'
})
export class TellPage {
 
  public emailForm;
  show:boolean = false;
  message:any = '';
  data: FirebaseListObservable<any[]>;
  constructor(
          public navCtrl: NavController,
           public navParams: NavParams,
            public angfire: AngularFire,
             public alrt: AlertController,
              public loadingCtrl: LoadingController,
               public formBuilder: FormBuilder,
            ) {
            this.data = this.angfire.database.list('/data');
            this.emailForm = formBuilder.group({
              email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
            });
            if(this.message == null || this.message == undefined){
              this.show = false;
            }
            else{
              this.show = true;
            }
          }
     submit(){
    if (!this.emailForm.valid) {
      console.log(this.emailForm.value);
    } else {
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
            email: this.emailForm.value.email,
            message: this.message
          }).then(
            ()=>{
              alert.present();
          //    this.email = "",
            //   this.message = ""
            }
          )
            loading.dismiss();
          }, 800);
              }
}
elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }
 
}
