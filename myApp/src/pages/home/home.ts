import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  testTs() {
    var v = window.localStorage.getItem("key");
    if(v) {
      console.log("VALUE: " + v);
    }
    else {
      console.log("V is undefined");
    }
  }
}
