import { Injectable } from '@angular/core';
import { UserPhoto } from '../user-photo';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Observable } from 'rxjs';
import { base64StringToBlob } from 'blob-util';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { KeydiyProduct } from '../interfaces/keydiy-product';

@Injectable({
  providedIn: 'root',
})
export class KeydiyProductUploadService {
  public selectImage: UserPhoto = { filepath: '', webviewPath: '' };
  private selectImagePhotoID: string = '';

  //
  public allkeydiyremotes: Array<KeydiyProduct> = [];

  constructor(
    private platform: Platform,
    public loadingController: LoadingController,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  public async addNewImagetoUploadArray() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    this.selectImagePhotoID = await this.readAsBase64(capturedPhoto);
    this.selectImage = savedImageFile;
  }

  private async savePicture(cameraPhoto: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.selectImage = { filepath: '', webviewPath: '' };

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  async uploadKEYDIYProduct(enteredKeydiyProdDetails: KeydiyProduct) {
    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading KEYDIY Product',
      backdropDismiss: false,
    });
    await loading.present();

    this.uploadImage(enteredKeydiyProdDetails);
  }

  uploadImage(enteredKeydiyProdDetails: KeydiyProduct) {
    let downloadURL: Observable<string>;

    const contenttype = 'image/png';
    const b64Data = this.selectImagePhotoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const filename =
      enteredKeydiyProdDetails.name + enteredKeydiyProdDetails.series + '.png';
    const uploadTask = this.storage.upload(
      'images/KeyDiyProducts/' + filename,
      blob
    );
    const fileRef = this.storage.ref('images/KeyDiyProducts/' + filename);

    uploadTask
      .snapshotChanges()
      .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
      .subscribe((response) => {
        if (response.state == 'success') {
          firebase
            .storage()
            .ref()
            .child('images/KeyDiyProducts/' + filename)
            .getDownloadURL()
            .then((imageURL) => {
              enteredKeydiyProdDetails.image = imageURL;

              this.uploadOtherInformations(enteredKeydiyProdDetails);
            });
        }
      });
  }

  uploadOtherInformations(enteredKeydiyProdDetails: KeydiyProduct) {
    this.http
      .post(
        'https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-keydiy-products.json',
        {
          ...enteredKeydiyProdDetails,
          key: null,
        }
      )
      .subscribe((resData) => {
        setInterval(() => {
          this.loadingController.dismiss();
        }, 2000);
        this.clearallphotos();
      });
  }

  clearallphotos() {
    this.selectImage = { filepath: '', webviewPath: '' };
    this.selectImagePhotoID = '';
  }

  // get all keydiy remotes from database
  getallKeydiyRemotes() {
    this.http
      .get<{ [key: string]: KeydiyProduct }>(
        'https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-keydiy-products.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allkeydiyremotes.push({
              key,
              name: resData[key].name,
              series: resData[key].series,
              notes: resData[key].notes,
              image: resData[key].image,
            });
            this.allkeydiyremotes.sort((a, b) =>
              a.series > b.series ? 1 : -1
            );
          }
        }
      });
  }
}
