import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GarageRemote } from '../interfaces/garage-remote';
import { Remote } from '../remote';

@Injectable({
  providedIn: 'root'
})
export class GetAvailableBoxNumberService {

  public availableANumber: number = 0;
  public availableBNumber: number = 0;
  public availableCNumber: number = 0;
  public availableWNumber: number = 0;

  constructor(private http: HttpClient) { }

  getAvailableBoxNumbers() {
    this.http
      .get<{ [key: string]: GarageRemote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/garage-remotes.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
         if (resData[key].shell == 'W'){
          if (resData[key].boxnumber > this.availableWNumber) {
            this.availableWNumber = resData[key].boxnumber;
          }
         }
         else if (resData[key].shell == 'A') {
          if (resData[key].boxnumber > this.availableANumber) {
            this.availableANumber = resData[key].boxnumber;
          }
         }
         else if (resData[key].shell == 'B') {
          if (resData[key].boxnumber > this.availableBNumber) {
            this.availableBNumber = resData[key].boxnumber;
          }

         }
         else if (resData[key].shell == 'C') {
          if (resData[key].boxnumber > this.availableCNumber) {
            this.availableCNumber = resData[key].boxnumber;
          }

         }
         else {
           console.log(resData[key].shell);
         }
        }
      });

      this.getCarRemotes();
  }

  getCarRemotes() {

    this.http
      .get<{ [key: string]: Remote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].shell == 'W'){
              if (resData[key].boxnumber > this.availableWNumber) {
                this.availableWNumber = resData[key].boxnumber;
              }
             }
             else if (resData[key].shell == 'A') {
              if (resData[key].boxnumber > this.availableANumber) {
                this.availableANumber = resData[key].boxnumber;
              }
             }
             else if (resData[key].shell == 'B') {
              if (resData[key].boxnumber > this.availableBNumber) {
                this.availableBNumber = resData[key].boxnumber;
              }

             }
             else if (resData[key].shell == 'C') {
              if (resData[key].boxnumber > this.availableCNumber) {
                this.availableCNumber = resData[key].boxnumber;
              }

             }
             else {
               console.log(resData[key].shell);
             }
            }
          }
      });

      this.getCarRemoteShells();

  }

  getCarRemoteShells() {
    this.http
      .get<{ [key: string]: Remote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].shell == 'W'){
              if (resData[key].boxnumber > this.availableWNumber) {
                this.availableWNumber = resData[key].boxnumber;
              }
             }
             else if (resData[key].shell == 'A') {
              if (resData[key].boxnumber > this.availableANumber) {
                this.availableANumber = resData[key].boxnumber;
              }
             }
             else if (resData[key].shell == 'B') {
              if (resData[key].boxnumber > this.availableBNumber) {
                this.availableBNumber = resData[key].boxnumber;
              }

             }
             else if (resData[key].shell == 'C') {
              if (resData[key].boxnumber > this.availableCNumber) {
                this.availableCNumber = resData[key].boxnumber;
              }

             }
             else {
               console.log(resData[key].shell);
             }
            }
        }
      });
  }
}
