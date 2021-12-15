import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router, private alertCtrl: AlertController,
    public modalController: ModalController,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login Successfully.',
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

  onSubmitLogin(form: NgForm) {

    const emailAdress = form.value.emailAddress;
    const password = form.value.password;

    this.authService.login(emailAdress,password).subscribe(resData => {

      this.presentToast();
      this.modalController.dismiss();
    }, errorRes => {
      const code= errorRes.error.error.message;
      console.log(errorRes);
      let message ="Could not Login";
      if (code === 'INVALID_PASSWORD') {
        message = 'Invalid Password!';
      }
      else if ('EMAIL_NOT_FOUND') {
        message = 'Email not found!';
      }

      this.showAlert(message);
    }
    );

  }


  private showAlert(message: string) {
    this.alertCtrl.create({header: 'Login failed',
    message: message, buttons: ['Okay']}).
    then(alertEl => alertEl.present());
  }

  onClickModalDismiss() {
    this.modalController.dismiss();
  }

}
