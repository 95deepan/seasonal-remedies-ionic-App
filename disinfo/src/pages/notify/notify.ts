import { Component } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';
import { NavController, Platform,AlertController } from 'ionic-angular';
import { LocalNotifications,AdMob } from 'ionic-native';
import * as moment from 'moment';
@Component({
  selector: 'page-notify',
  templateUrl: 'notify.html'
})
export class NotifyPage {
    notifyTime: any;
    notifications: any[] = []; 
    daysA: any[];
    daysB: any[];
    daysC: any[];
    daysD: any[];
    daysE: any[];
    chosenHours: number;
    chosenMinutes: number;
    weather:any;
    season:any = "summer" ;
   constructor(
     public navCtrl: NavController,
      public platform: Platform,
       public alertCtrl: AlertController) {
 
        this.notifyTime = moment(new Date()).format();
 
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
         /*
            A-SUMMER
            B-WINTER
            C-FALL
            D-SPRING
            E-RAINY
         */
        this.daysA = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Conjunctivitis',ntext:'Wash your eyes with cold water frequently,Keep yourself away from infected person'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'}
        ];
         this.daysB = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common cold',ntext:'Avoid cold food items,Have boiled water'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Painful Joints',ntext:'Do not control urine flow, use restroom as frequent as required'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Cold Sores',ntext:'Maintain warm body temperature'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'}
        ];
         this.daysC = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'}
        ];
         this.daysD = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'}
        ];
         this.daysE = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common Fever',ntext:'Avoid cold food items,like Curd,IceCream,Cool Drinks'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Cholera',ntext:'Keep yourself clean, Cook food well(especially sea food),Get vaccinated when you travel'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Dengue',ntext:'Keep your environment clean, to avoid mosquitoes that causes Dengue'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Viral fever',ntext:'Go for regular checkups,once affected with fever.Make sure it is not viral fever'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Bacterial fever',ntext:'Drink boiled water/Purified water only.Take bath daily'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Malaria',ntext:'Use mosquito repellants, especailly when you travel on watery areas'}
        ];
 
    }
 toggle(){
    this.daysA = [
            {title: 'Monday', dayCode: 1, checked: false,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Tuesday', dayCode: 2, checked: false,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Wednesday', dayCode: 3, checked: false,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: false,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'},
            {title: 'Friday', dayCode: 5, checked: false,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Saturday', dayCode: 6, checked: false,ntitle: 'Conjunctivitis',ntext:'Wash your eyes with cold water frequently,Keep yourself away from infected person'},
            {title: 'Sunday', dayCode: 0, checked: false,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'}
        ];
         this.daysB = [
            {title: 'Monday', dayCode: 1, checked: false,ntitle: 'Common cold',ntext:'Avoid cold food items,Have boiled water'},
            {title: 'Tuesday', dayCode: 2, checked: false,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Wednesday', dayCode: 3, checked: false,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Thursday', dayCode: 4, checked: false,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Friday', dayCode: 5, checked: false,ntitle: 'Painful Joints',ntext:'Do not control urine flow, use restroom as frequent as required'},
            {title: 'Saturday', dayCode: 6, checked: false,ntitle: 'Cold Sores',ntext:'Maintain warm body temperature'},
            {title: 'Sunday', dayCode: 0, checked: false,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'}
        ];
         this.daysC = [
            {title: 'Monday', dayCode: 1, checked: false,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Tuesday', dayCode: 2, checked: false,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: false,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: false,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Friday', dayCode: 5, checked: false,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'},
            {title: 'Saturday', dayCode: 6, checked: false,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Sunday', dayCode: 0, checked: false,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'}
        ];
         this.daysD = [
            {title: 'Monday', dayCode: 1, checked: false,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Tuesday', dayCode: 2, checked: false,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: false,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Thursday', dayCode: 4, checked: false,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'},
            {title: 'Friday', dayCode: 5, checked: false,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Saturday', dayCode: 6, checked: false,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Sunday', dayCode: 0, checked: false,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'}
        ];
         this.daysE = [
            {title: 'Monday', dayCode: 1, checked: false,ntitle: 'Common Fever',ntext:'Avoid cold food items,like Curd,IceCream,Cool Drinks'},
            {title: 'Tuesday', dayCode: 2, checked: false,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Wednesday', dayCode: 3, checked: false,ntitle: 'Cholera',ntext:'Keep yourself clean, Cook food well(especially sea food),Get vaccinated when you travel'},
            {title: 'Thursday', dayCode: 4, checked: false,ntitle: 'Dengue',ntext:'Keep your environment clean, to avoid mosquitoes that causes Dengue'},
            {title: 'Friday', dayCode: 5, checked: false,ntitle: 'Viral fever',ntext:'Go for regular checkups,once affected with fever.Make sure it is not viral fever'},
            {title: 'Saturday', dayCode: 6, checked: false,ntitle: 'Bacterial fever',ntext:'Drink boiled water/Purified water only.Take bath daily'},
            {title: 'Sunday', dayCode: 0, checked: false,ntitle: 'Malaria',ntext:'Use mosquito repellants, especailly when you travel on watery areas'}
        ];
 }
 toggle2(){
             this.daysA = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Conjunctivitis',ntext:'Wash your eyes with cold water frequently,Keep yourself away from infected person'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'}
        ];
         this.daysB = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common cold',ntext:'Avoid cold food items,Have boiled water'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Painful Joints',ntext:'Do not control urine flow, use restroom as frequent as required'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Cold Sores',ntext:'Maintain warm body temperature'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'}
        ];
         this.daysC = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Sore throat',ntext:'Avoid smoke and other irritants, Increase fluid intakes'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Jaundice',ntext:'Avoid fried foods,junk foods,Alcohol,legumes.Have boiled water'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Flu',ntext:'Use face-mask when you cross polluted areas, Keep your surroundings clean'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Typhoid',ntext:'Have boiled water,Make sure of purified intakes'}
        ];
         this.daysD = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Skin Rashes',ntext:'Avoid direct exposure to sunlight, Use prickly heat powder'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Chicken Pox',ntext:'Avoid spicy foods,Keep your body cool, Aciclovir is the antiviral drug'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Fever',ntext:'Avoid cold food items,curd,etc.Go for medical checkup if affected & make sure it is normal fever'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Noro Virus',ntext:'Your hygienicity saves you from this virus'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Asthma',ntext:'Avoid pollution exposure,keep your surroundings free from dust'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Headache',ntext:'Have more water, avoid direct exposure to sunlight'}
        ];
         this.daysE = [
            {title: 'Monday', dayCode: 1, checked: true,ntitle: 'Common Fever',ntext:'Avoid cold food items,like Curd,IceCream,Cool Drinks'},
            {title: 'Tuesday', dayCode: 2, checked: true,ntitle: 'Common cold',ntext:'Have cold relieving chocolates, Avoid cold items,Dry the hair quickly if you got drenched in rain'},
            {title: 'Wednesday', dayCode: 3, checked: true,ntitle: 'Cholera',ntext:'Keep yourself clean, Cook food well(especially sea food),Get vaccinated when you travel'},
            {title: 'Thursday', dayCode: 4, checked: true,ntitle: 'Dengue',ntext:'Keep your environment clean, to avoid mosquitoes that causes Dengue'},
            {title: 'Friday', dayCode: 5, checked: true,ntitle: 'Viral fever',ntext:'Go for regular checkups,once affected with fever.Make sure it is not viral fever'},
            {title: 'Saturday', dayCode: 6, checked: true,ntitle: 'Bacterial fever',ntext:'Drink boiled water/Purified water only.Take bath daily'},
            {title: 'Sunday', dayCode: 0, checked: true,ntitle: 'Malaria',ntext:'Use mosquito repellants, especailly when you travel on watery areas'}
        ];
 }
  ionViewDidLoad(){ 
     // Getting openweather data from storage
    this.weather = localStorage.getItem('weather');
    // setting value of season to show days list
     if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
       this.season = 'summer'; 
    }
     if(this.weather == 'snow' || this.weather == 'mist'){
       this.season = 'winter';
     }
     if(this.weather == 'scattered clouds' ){
         this.season = 'fall';
     }
      if(this.weather = 'broken clouds'){
          this.season = 'spring';
      }
      if(
    this.weather == 'shower rain' || 
    this.weather == 'light rain'  ||
    this.weather == 'rain'        ||
    this.weather == 'thunderstorm'||
    this.weather == 'moderate rain'||
    this.weather == 'overcast clouds'
){
    this.season = 'rainy';
}
     // Showing Ad banner
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
 
    timeChange(time){
       this.chosenHours = time.hour.value;
      this.chosenMinutes = time.minute.value;
    }
 
    addNotifications(){
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
                    //-------------------------SUMMER-------------
 if(this.weather == 'clear sky' || this.weather == 'few clouds' || this.weather == 'haze'){
    for(let day of this.daysA){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: day.ntitle,
                text: day.ntext,
                at: firstNotificationTime,
                every: 'week'
            };
 
            this.notifications.push(notification);
 
        }
 
    } 
 }
           //-------------------------WINTER-------------
  if(this.weather == 'snow' || this.weather == 'mist'){
    for(let day of this.daysB){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: day.ntitle,
                text: day.ntext,
                at: firstNotificationTime,
                every: 'week'
            };
 
            this.notifications.push(notification);
 
        }
 
    }
  }
             //-------------------------FALL-------------
   if(this.weather == 'scattered clouds' ){
    for(let day of this.daysC){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: day.ntitle,
                text: day.ntext,
                at: firstNotificationTime,
                every: 'week'
            };
 
            this.notifications.push(notification);
 
        }
 
    }
          }
            //-------------------------SPRING-------------
  if(this.weather = 'broken clouds'){
    for(let day of this.daysD){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: day.ntitle,
                text: day.ntext,
                at: firstNotificationTime,
                every: 'week'
            };
 
            this.notifications.push(notification);
 
        }
 
    }
  }
                //-------------------------RAINY-------------
if(
    this.weather == 'shower rain' || 
    this.weather == 'light rain'  ||
    this.weather == 'rain'        ||
    this.weather == 'thunderstorm'||
    this.weather == 'moderate rain'||
    this.weather == 'overcast clouds'
){
    for(let day of this.daysE){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: day.ntitle,
                text: day.ntext,
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
                title: 'Notifications set',
                buttons: ['Ok']
            });
 
            alert.present();
 
        });
 
    }
    }
 
    cancelAll(){
        LocalNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        title: 'Successfully Disabled Notifications',
        buttons: ['Ok']
    });
 
    alert.present();
    }

}

