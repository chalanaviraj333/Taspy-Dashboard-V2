import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { User } from '../interfaces/user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  private _user= new BehaviorSubject<User>(null);

  isLogin: boolean = true;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      } else {
        return false;
      }
  })

  );

}


  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  autoLogin() {
    return from(Storage.get({key: 'authData'})).pipe(map(
      storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTIme = new Date(parsedData.tokenExpirationDate);
        if (expirationTIme <= new Date()) {
          return null;
        }
        const user = new User(parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTIme);
          return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
      )
  }



  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      {email: email, password: password, returnSecureToken: true}
    ).pipe(tap(userData => {
      const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
      this._user.next(new User(userData.localId, userData.email, userData.idToken, expirationTime));

      this.storeAuthData(userData.localId, userData.idToken, expirationTime.toISOString(), userData.email);
      this.isLogin = false;
    }));
  }

  logout() {
    this._user.next(null);
    Storage.remove({key: 'authData'});
    this.isLogin = true;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
    {email: email, password: password, returnSecureToken: true}
    )

  }


  private storeAuthData(userId: string, token: string, tokenExpirationDate: string, email: string) {

      const data = JSON.stringify({userId: userId, token: token, tokenExpirationDate: tokenExpirationDate, email: email});
      Storage.set({
        key: 'authData',
        value: data,
      });

  }


getStorageData() {
    Storage.get({key: 'authData'}).then(
      storedData => {
        if (!storedData || !storedData.value) {
          return;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTIme = new Date(parsedData.tokenExpirationDate);
        if (expirationTIme <= new Date()) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }


      });
  }
}
