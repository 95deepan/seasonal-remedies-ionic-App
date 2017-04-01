import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  SEEN_SLIDES = 'hasSeenSlides';
  constructor(public storage: Storage) {}
 checkHasSeenSlides() {
    return this.storage.get(this.SEEN_SLIDES).then((value) => {
      return value;
    })
  };
}
