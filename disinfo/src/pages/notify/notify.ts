import { Component } from '@angular/core';
import { NavController, Platform,AlertController,LoadingController } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import { MainPage } from '../main/main';
import * as moment from 'moment';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-notify',
  templateUrl: 'notify.html'
})
export class NotifyPage {
    summer:FirebaseListObservable<any[]>;
    winter:FirebaseListObservable<any[]>;
    fall:FirebaseListObservable<any[]>;
    spring:FirebaseListObservable<any[]>;
    rainy:FirebaseListObservable<any[]>;

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
    season:any  ;
   constructor(
     public navCtrl: NavController,
      public platform: Platform,
       public alertCtrl: AlertController,
        public af:AngularFire,
         public load: LoadingController
        ) {
 
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
  
    }
 toggle(){
     for(let f=0;f<7;f++){
         this.daysA[f].checked = false;
         this.daysB[f].checked = false;
         this.daysC[f].checked = false;
         this.daysD[f].checked = false;
         this.daysE[f].checked = false;
     }
 }
 toggle2(){
    for(let f=0;f<7;f++){
         this.daysA[f].checked = true;
         this.daysB[f].checked = true;
         this.daysC[f].checked = true;
         this.daysD[f].checked = true;
         this.daysE[f].checked = true;
     }
 }
  ionViewDidLoad(){ 
     // Getting openweather data from storage
    this.weather = localStorage.getItem('newseason');
    //debugger;

    // setting value of season to show days list
    switch(this.weather){

        case 'summer':
         this.season = "summer";
         break;

        case 'winter':
         this.season = "winter" ;
         break;

        case 'fall':
          this.season = "fall" ;
         break;

        case 'spring':
        this.season = "spring";
         break;

        case 'rainy':
         this.season = "rainy";
         break;
    }
          let loading = this.load.create({
          content:'Please wait...'
      })
      loading.present();
      setTimeout(()=> {
          this.summer = this.af.database.list('/summer');
       this.summer.subscribe(sum=>{
           this.daysA= [];
           this.daysA = sum;
       });

       this.winter = this.af.database.list('/winter');
       this.winter.subscribe(sum=>{
           this.daysB= [];
           this.daysB = sum;
       });

       this.fall = this.af.database.list('/fall');
       this.fall.subscribe(sum=>{
           this.daysC= [];
           this.daysC = sum;
       });

       this.spring = this.af.database.list('/spring');
       this.spring.subscribe(sum=>{
           this.daysD= [];
           this.daysD = sum;
       });

       this.rainy = this.af.database.list('/rainy');
       this.rainy.subscribe(sum=>{
           this.daysE= [];
           this.daysE = sum;
       });
      },1000);
      loading.dismiss();
          }
         
    timeChange(time){
       this.chosenHours = time.hour.value;
      this.chosenMinutes = time.minute.value;
    }
 
    addNotificationsA(){
        localStorage.setItem('notifyset','true')
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("summer notif set");
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
            console.log("Notifications time is ", firstNotificationTime);
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
            // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: [{
                    text:'ok',
                    handler: () => {
                    this.navCtrl.push(MainPage);
                    }
                }]
            });
 
            alert.present();
 
        });
 
    
    }
        addNotificationsB(){
        localStorage.setItem('notifyset','true')
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("winter notif set");
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
             console.log("Notifications time is ", firstNotificationTime);
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
      LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: [{
                    text:'ok',
                    handler: () => {
                    this.navCtrl.push(MainPage);
                    }
                }]
            });
 
            alert.present();
 
        });
    
    }
        addNotificationsC(){
        localStorage.setItem('notifyset','true')
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("fall notif set");
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
            console.log("Notifications time is ", firstNotificationTime);
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
            // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: [{
                    text:'ok',
                    handler: () => {
                    this.navCtrl.push(MainPage);
                    }
                }]
            });
 
            alert.present();
 
        });
 
    
    }
        addNotificationsD(){
        localStorage.setItem('notifyset','true')
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("spring notif set");
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
             console.log("Notifications time is ", firstNotificationTime);
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
            // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: [{
                    text:'ok',
                    handler: () => {
                    this.navCtrl.push(MainPage);
                    }
                }]
            });
 
            alert.present();
 
        });
 
    
    }
        addNotificationsE(){
        localStorage.setItem('notifyset','true')
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("rainy notif set");
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
            console.log("Notifications time is ", firstNotificationTime);
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
            // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: [{
                    text:'ok',
                    handler: () => {
                    this.navCtrl.push(MainPage);
                    }
                }]
            });
 
            alert.present();
 
        });
 
    
    }
    
                
 
    cancelAll(){
        LocalNotifications.cancelAll();
        localStorage.setItem('notifyset','false');
    let alert = this.alertCtrl.create({
        title: 'Successfully Disabled Notifications',
        buttons: ['Ok']
    });
 
    alert.present();
    }

}

