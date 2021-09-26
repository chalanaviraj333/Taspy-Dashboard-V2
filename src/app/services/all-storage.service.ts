import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AllStorageService {

  constructor(private storage: AngularFireStorage) { }

  // delete photos from firebase storage
  deletePhoto(imageURL: string) {
    this.storage.storage.refFromURL(imageURL).delete();
  }
}
