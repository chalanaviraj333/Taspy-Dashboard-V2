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
import { CarSubModel } from '../interfaces/car-sub-model';


@Injectable({
  providedIn: 'root'
})
export class CarSubModelEditService {

  public carsubmodelImage: UserPhoto = {filepath: '', webviewPath: ''};
  public carFrontPhoto: UserPhoto = {filepath: '', webviewPath: ''};
  public carRemoteLookslike: UserPhoto = {filepath: '', webviewPath: ''};

  private carsubmodelImagePhotoID: string = '';
  private carFrontPhotoPhotoID: string = '';
  private carRemoteLookslikePhotoID: string = '';

  // private photoID: string = '';
  private PHOTO_STORAGE: string = 'photos';

  constructor(private platform: Platform, public loadingController: LoadingController, private storage: AngularFireStorage, private http: HttpClient) { }

  public async editNewImagetoUploadArray(imagetype: string) {

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    if (imagetype == 'submodelicon') {
      this.carsubmodelImagePhotoID = await this.readAsBase64(capturedPhoto);
      this.carsubmodelImage = savedImageFile;
    }
    else if (imagetype == 'carfrontimage') {
      this.carFrontPhotoPhotoID = await this.readAsBase64(capturedPhoto);
      this.carFrontPhoto = savedImageFile;
    }
    else if (imagetype == 'remotelookslikephoto') {
      this.carRemoteLookslikePhotoID = await this.readAsBase64(capturedPhoto);
      this.carRemoteLookslike = savedImageFile;
    }

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
    this.carsubmodelImage = {filepath: '', webviewPath: ''};


    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  async uploadSubCarModel(enteredCarModelDetails: CarSubModel) {

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading ' + enteredCarModelDetails.model + ' ' + enteredCarModelDetails.submodel,
      backdropDismiss: false,
    });
    await loading.present();

    this.uploadCarIcontoStorage(enteredCarModelDetails);
  }

  uploadCarIcontoStorage(enteredCarModelDetails: CarSubModel) {
    let downloadURL: Observable<string>;

    if (this.carsubmodelImagePhotoID == '') {
      this.uploadCarFrontImageToStorage(enteredCarModelDetails);
      return;
    }

    const contenttype = 'image/png';
    const b64Data = this.carsubmodelImagePhotoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const folder = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition;
    const filename = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition + 'caricon' + '.png';
    const uploadTask = this.storage.upload('images/submodels/' + folder + '/' + filename, blob);
    const fileRef = this.storage.ref('images/submodels/' + folder + '/' + filename);

    uploadTask
    .snapshotChanges()
    .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
    .subscribe((response) => {
      if (response.state == 'success') {
        firebase
          .storage()
          .ref()
          .child('images/submodels/' + folder + '/' + filename)
          .getDownloadURL()
          .then((imageURL) => {
            enteredCarModelDetails.icon = imageURL;

            this.uploadCarFrontImageToStorage(enteredCarModelDetails);
          });
      }
    });

  }

  uploadCarFrontImageToStorage(enteredCarModelDetails: CarSubModel) {
    let downloadURL: Observable<string>;

    if (this.carFrontPhotoPhotoID == '') {
      this.uploadCarOriginalKeyPhotoToStorage(enteredCarModelDetails);
      return;
    }


    const contenttype = 'image/png';
    const b64Data = this.carFrontPhotoPhotoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const folder = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition;
    const filename = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition + 'carfrontimage' + '.png';
    const uploadTask = this.storage.upload('images/submodels/' + folder + '/' + filename, blob);
    const fileRef = this.storage.ref('images/submodels/' + folder + '/' + filename);

    uploadTask
    .snapshotChanges()
    .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
    .subscribe((response) => {
      if (response.state == 'success') {
        firebase
          .storage()
          .ref()
          .child('images/submodels/' + folder + '/' + filename)
          .getDownloadURL()
          .then((imageURL) => {
            enteredCarModelDetails.useruploadImage = imageURL;

            this.uploadCarOriginalKeyPhotoToStorage(enteredCarModelDetails);
          });
      }
    });
  }

  uploadCarOriginalKeyPhotoToStorage(enteredCarModelDetails: CarSubModel) {
    let downloadURL: Observable<string>;

    if (this.carRemoteLookslikePhotoID == '') {
      this.uploadCarInformationstoDatabase(enteredCarModelDetails);
      return;
    }

    const contenttype = 'image/png';
    const b64Data = this.carRemoteLookslikePhotoID.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);
    const folder = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition;
    const filename = enteredCarModelDetails.brand + enteredCarModelDetails.model + enteredCarModelDetails.submodel + enteredCarModelDetails.startyear + enteredCarModelDetails.endyear + enteredCarModelDetails.typeofignition + 'caroriginalremotephoto' + '.png';
    const uploadTask = this.storage.upload('images/submodels/' + folder + '/' + filename, blob);
    const fileRef = this.storage.ref('images/submodels/' + folder + '/' + filename);

    uploadTask
    .snapshotChanges()
    .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())))
    .subscribe((response) => {
      if (response.state == 'success') {
        firebase
          .storage()
          .ref()
          .child('images/submodels/' + folder + '/' + filename)
          .getDownloadURL()
          .then((imageURL) => {
            enteredCarModelDetails.uploadremotephoto = imageURL;

            this.uploadCarInformationstoDatabase(enteredCarModelDetails);
          });
      }
    });

  }


  uploadCarInformationstoDatabase(enteredCarModelDetails: CarSubModel) {

    this.http
        .put(
          `https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-sub-models/${enteredCarModelDetails.key}.json`,
          { ...enteredCarModelDetails, key: null }
        )
        .subscribe((resData) => {
          setInterval(() => {
            this.loadingController.dismiss();
          }, 2000);

        });
  }

}
