import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage     } from '../about/about';
import { AppState      } from '../../model/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
   * Controller variables used in the view
   */
  name    : string;
  iname   : string;
  iprice  : number;
  iqty    : number;
  tip     : number;

  appState : AppState;

  constructor(public navCtrl: NavController) {
    this.tip = 10;
    this.clearItems();
  }

  goToSharePage() {
    this.navCtrl.push(AboutPage, {appState: this.appState, tip:  this.tip});
  }

  clearItems() {
    this.appState = new AppState();
  }

  addFriend() {
    this.appState.addFriend(this.name);
  }

  addItem() {
    this.appState.addItem(this.iname, this.iprice, this.iqty);
  }

}
