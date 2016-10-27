import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ContactPage              } from '../contact/contact';
import { AppState, Item           } from '../../model/model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  appState : AppState;

  constructor(public navCtrl: NavController, navParams: NavParams) {

    this.appState = navParams.data.appState;
    this.appState.accountForTip(navParams.data.tip);
  }

  splitEqually(i : Item) {
    this.appState.splitEqually(i);
  }

  sendItemToFriend(f) {
    this.appState.sendItemToFriend(f);
  }

  goToPaymentPage() {
    this.navCtrl.push(ContactPage, {appState: this.appState});
  }

  round(n) {
    let r = (n * 100) % 1;
    return (n * 100 - r) / 100;
  }

}
