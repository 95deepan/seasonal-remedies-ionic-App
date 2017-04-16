import { Component } from '@angular/core';
import { NavController, Platform,AlertController } from 'ionic-angular';
import { LocalNotifications,AdMob } from 'ionic-native';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
// import * as moment from 'moment';
// MY ALGORITHM
// set notificatio for each season and set an id for each notification , then
// trigger and cancel specific Notifications according to usr selection
// by default set all notifi active for a particular season.

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    notifyTime: any = "08:00" ;
    notifications: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;
    disabled:boolean = false;
    weather:any;
   constructor(
     public navCtrl: NavController,
      public platform: Platform,
       public alertCtrl: AlertController,
        public nativePageTransitions: NativePageTransitions
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
 
     //   this.notifyTime = moment(new Date()).format();
        this.weather = localStorage.getItem('weather');
        console.log("Curent weather is ",this.weather);
      //  this.chosenHours = new Date().getHours();
     //   this.chosenMinutes = new Date().getMinutes();
 
        this.days = [
            {title: 'Monday', dayCode: 1, checked: true},
            {title: 'Tuesday', dayCode: 2, checked: true},
            {title: 'Wednesday', dayCode: 3, checked: true},
            {title: 'Thursday', dayCode: 4, checked: true},
            {title: 'Friday', dayCode: 5, checked: true},
            {title: 'Saturday', dayCode: 6, checked: true},
            {title: 'Sunday', dayCode: 0, checked: true}
        ];
       // if(this.disabled == false){
     //   this.addNotifications();}
     //   else{
     //       return;
    //    }
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); 
    console.log("Today is",currentDay);
    }
   ionViewWillLeave() {

 let options: NativeTransitionOptions = {
    direction: 'right',
    duration: 800,
    slowdownfactor: 3,
    slidePixels: 20,
    iosdelay: 500,
    androiddelay: 500,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
   };
 this.nativePageTransitions.slide(options)
   .then(()=>{
      // alert("Animated");
       console.log("Succesfully animated");
    }   
   )
   .catch(()=>{
   //  alert("not animated");
     console.log("Not animates");
   });

}
    toggle(){
        this.days = [
            {title: 'Monday', dayCode: 1, checked: false},
            {title: 'Tuesday', dayCode: 2, checked: false},
            {title: 'Wednesday', dayCode: 3, checked: false},
            {title: 'Thursday', dayCode: 4, checked: false},
            {title: 'Friday', dayCode: 5, checked: false},
            {title: 'Saturday', dayCode: 6, checked: false},
            {title: 'Sunday', dayCode: 0, checked: false    }
        ];
    }
    toggle2(){
        this.days = [
            {title: 'Monday', dayCode: 1, checked: true},
            {title: 'Tuesday', dayCode: 2, checked: true},
            {title: 'Wednesday', dayCode: 3, checked: true},
            {title: 'Thursday', dayCode: 4, checked: true},
            {title: 'Friday', dayCode: 5, checked: true},
            {title: 'Saturday', dayCode: 6, checked: true},
            {title: 'Sunday', dayCode: 0, checked: true   }
        ];
    }
    timeChange(time){
       this.chosenHours = time.hour.value;
      this.chosenMinutes = time.minute.value;
      console.log("Current time is",this.chosenHours,"hrs",this.chosenMinutes,"mins")
    }
 
    addNotifications(){
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
 
    for(let day of this.days){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
           // firstNotificationTime.setHours(this.chosenHours);
         //   firstNotificationTime.setMinutes(this.chosenMinutes);
                  //------------------- FOR SUMMER--------------------
        
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 0,
                title: 'Headache',
                text: 'Have more water, avoid direct exposure to sunlight',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 1,
                title: 'Chicken Pox',
                text: 'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 2,
                title: 'Jaundice',
                text: 'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 3,
                title: 'Typhoid',
                text: 'Have boiled water,Make sure of purified intakes',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 4,
                title: 'Skin Rashes',
                text: 'Avoid direct exposure to sunlight, Use prickly heat powder',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 5,
                title: 'Conjunctivitis',
                text: 'Wash your eyes with cold water frequently,Keep yourself away from infected person',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
            let notification = {
                id: 6,
                title: 'Flu',
                text: 'Use face-mask when you cross polluted areas, Keep your surroundings clean',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

        //------------------FOR WINTER --------------------
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 0,
                title: 'Common cold',
                text: 'Avoid cold food items,Have boiled water',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 1,
                title: 'Sore throat',
                text: 'Avoid smoke and other irritants, Increase fluid intakes',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 2,
                title: 'Asthma',
                text: 'Avoid pollution exposure,keep your surroundings free from dust',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 3,
                title: 'Noro Virus',
                text: 'Your hygienicity saves you from this virus',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 4,
                title: 'Painful Joints',
                text: 'Do not control urine flow, use restroom as frequent as required',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 5,
                title: 'Cold Sores',
                text: 'Maintain warm body temperature',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'snow' || this.weather == 'mist'){
            let notification = {
                id: 6,
                title: 'Fever',
                text: 'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
          //-------------FOR RAINY---------------------------------

          if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 0,
                title: 'Common Fever',
                text: 'Avoid cold food items,like Curd,IceCream,Cool Drinks',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

          if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 1,
                title: 'Common cold',
                text: 'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

        if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 2,
                title: 'Cholera',
                text: 'Keep yourself clean, Cook food well(especially sea food),Get vaccinated when you travel',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

         if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 3,
                title: 'Dengue',
                text: 'Keep your environment clean, to avoid mosquitoes that causes Dengue',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

         if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 4,
                title: 'Viral fever',
                text: 'Go for regular checkups,once affected with fever.Make sure it is not viral fever',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }

         if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 5,
                title: 'Bacterial fever',
                text: 'Drink boiled water/Purified water only.Take bath daily',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
         if(this.weather == 'shower rain' || this.weather == 'light rain'
             || this.weather == 'rain' || this.weather == 'moderate rain'
             || this.weather == 'thunderstorm'
          ){
            let notification = {
                id: 6,
                title: 'Malaria',
                text: 'Use mosquito repellants, especailly when you travel on watery areas',
                at: firstNotificationTime,
                every: 'week'
            };
            this.notifications.push(notification);
        }
        
        }
 
    }
    
   // console.log("Notifications to be scheduled: ", this.notifications);
 
    if(this.platform.is('cordova')){
 
        // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: ['Ok']
            });
 
            alert.present();
 
        });
 
    }
    }
 
    cancelAll(){
        this.disabled = true;

        LocalNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        subTitle: 'Successfully Disabled Notifications',
        buttons: ['Ok']
    });
 
    alert.present();
    }

}
