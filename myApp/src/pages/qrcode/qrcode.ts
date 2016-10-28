import { Component } from '@angular/core';

import qrcode from 'qrcode-generator/js/qrcode';

@Component({
  selector: 'qrcode',
  template: `
    <div [innerHTML]="content">
    </div>
  `
})
export class QrCode {
  data : string;
  content : string;
  constructor() {
    this.data = "Hohoho"
    this.regenerateImg();
  }

  regenerateImg() {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(this.data);
    qr.make();
    this.content = qr.createImgTag();

  }
}

