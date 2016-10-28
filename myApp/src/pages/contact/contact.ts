import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AppState, Friend         } from '../../model/model';

//import { QrCode } from '../qrcode/qrcode';
import qrcode from 'qrcode-generator/js/qrcode';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  appState : AppState;
  content : string;
  data : string;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.appState = navParams.data.appState;
    this.regenerateImg();
  }

  regenerateImg() {
    let data = 
      JSON.stringify(this.appState.unassigned);
    var typeNumber = 30;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(data);
    qr.make();
    this.content = qr.createImgTag();

  }

  payFor(f : Friend) {
    this.appState.payFor(f);
  }

  unpayFor(f : Friend) {
    this.appState.unpayFor(f);
  }
}
