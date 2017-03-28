import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  SEEN_SLIDES = 'hasSeenSlides';
  newlat:any ;
  newlon:any ; 
  constructor(public storage: Storage) {
       this.storage.get('userlat').then((userlat)=>{this.newlat=userlat;})
       this.storage.get('userlon').then((userlon)=>{this.newlat=userlon;})
  }
 checkHasSeenSlides() {
    return this.storage.get(this.SEEN_SLIDES).then((value) => {
      return value;
    })
  };
}
