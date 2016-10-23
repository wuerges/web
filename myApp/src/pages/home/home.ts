import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
data : Array<{name: string, price:number, quantity: number}>;
  constructor(public navCtrl: NavController) {
    this.data = [];
    this.data.push({name:"Cerveja", price:10.0, quantity: 2.5});
  }

  loadItems() {
    this.navCtrl.push(AboutPage, this.data);
  }
  clearItems() {
    this.data = [];
    this.loadItems();
  }
}
