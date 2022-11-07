import { Injectable } from '@angular/core';
import { UserPhoto } from '../user-photo';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Observable } from 'rxjs';
import { base64StringToBlob } from 'blob-util';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../car-model';
import { CarBrand } from '../car-brand';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  public photos: UserPhoto[] = [];
  private photoID: string = '';
  private PHOTO_STORAGE: string = 'photos';
  public validentry: boolean = true;
  public uploadphotobutton: boolean = false;

  constructor(private platform: Platform, public loadingController: LoadingController, private storage: AngularFireStorage, private http: HttpClient) { }

  public async addNewToGallery() {
    // clear previous photos from Array
    this.photos = [];

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    this.photoID = await this.readAsBase64(capturedPhoto);

    // Add new photo to Photos array
    this.photos.unshift(savedImageFile);
    this.validentry = false;
    this.uploadphotobutton = true;
    // Cache all photo data for future retrieval
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
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
    this.photos.splice(position, 1);
    this.validentry = true;
    this.uploadphotobutton = false;

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  async uploadCarBrand(enteredCarBrandDetails: CarBrand) {
    let downloadURL: Observable<string>;

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading ' + enteredCarBrandDetails.name,
      backdropDismiss: false,
    });
    await loading.present();

    const contenttype = 'image/png';
    const b64Data = this.photoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const filename = enteredCarBrandDetails.name +'.png';
    const uploadTask = this.storage.upload('images/carbrands/' + filename, blob);
    const fileRef = this.storage.ref('images/carbrands/' + filename);

    uploadTask
      .snapshotChanges()
      .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
      .subscribe((response) => {
        if (response.state == 'success') {
          firebase
            .storage()
            .ref()
            .child('images/carbrands/' + filename)
            .getDownloadURL()
            .then((imageURL) => {

              // this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json', {...enteredCarBrandDetails, icon: imageURL}).subscribe(
              // resData => {
              //   setInterval(() => {
              //     loading.dismiss();
              //   }, 2000);

              //     loading.message = 'Successfully Uploaded';
              //     loading.spinner = null;
              //     this.clearallphotos();

              // }
              // );

              this.http.post('https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-brands.json', {...enteredCarBrandDetails, icon: imageURL}).subscribe(
              resData => {
                setInterval(() => {
                  loading.dismiss();
                }, 2000);

                  loading.message = 'Successfully Uploaded';
                  loading.spinner = null;
                  this.clearallphotos();

              }
              );
            });
        }
      });
  }

  async uploadCarModel(enteredCarModelDetails: CarModel) {
    let downloadURL: Observable<string>;

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading ' + enteredCarModelDetails.model,
      backdropDismiss: false,
    });
    await loading.present();

    const contenttype = 'image/png';
    const b64Data = this.photoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const filename = enteredCarModelDetails.brand + enteredCarModelDetails.model +'.png';
    const uploadTask = this.storage.upload('images/carmodels/' + filename, blob);
    const fileRef = this.storage.ref('images/carmodels/' + filename);

    uploadTask
      .snapshotChanges()
      .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
      .subscribe((response) => {
        if (response.state == 'success') {
          firebase
            .storage()
            .ref()
            .child('images/carmodels/' + filename)
            .getDownloadURL()
            .then((imageURL) => {

              this.http.post('https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-models.json', {...enteredCarModelDetails, show: true, icon: imageURL}).subscribe(
              resData => {
                setInterval(() => {
                  loading.dismiss();
                }, 2000);

                  loading.message = 'Successfully Uploaded';
                  loading.spinner = null;
                  this.clearallphotos();

              }
              );
            });
        }
      });
  }

  clearallphotos() {
    this.photos = [];
    this.uploadphotobutton = false;
    this.validentry = true;
  }

}
