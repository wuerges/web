import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AppState, Friend         } from '../../model/model';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  appState : AppState;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.appState = navParams.data.appState;
  }


  payFor(f : Friend) {
    this.appState.payFor(f);
  }

  unpayFor(f : Friend) {
    this.appState.unpayFor(f);
  }
}
