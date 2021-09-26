import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-send-receipt',
  templateUrl: './send-receipt.page.html',
  styleUrls: ['./send-receipt.page.scss'],
})
export class SendReceiptPage implements OnInit {

  public currentDate: Date;

  constructor(private emailComposer: EmailComposer) {
    this.currentDate = new Date();

  }

  sendemailButton() {
    let email = {
      to: 'chalana.viraj333@gmail.com',
      cc: 'chalana.nk333@gmail.com',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    this.emailComposer.open(email);
  }

  ngOnInit() {
  }

}
