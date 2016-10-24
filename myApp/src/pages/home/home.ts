import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name : string;
  iname : string;
  iprice : number;
  iqty : number;
  tip : number;
  items : Array<{name: string, price:number, quantity: number, qty_s: number}>;
  friends : Array<string>;


  constructor(public navCtrl: NavController) {
    this.tip = 0;
    this.clearItems();
  }

  goToSharePage() {
    this.navCtrl.push(AboutPage, 
      { friends: this.friends
      , items:   this.items
      , tip:   this.tip }
    );
  }

  clearItems() {
    this.friends = ["me"];
    this.items   = [];
    /*this.items = [
      {name:"Cerveja", price:10.0, quantity: 2.5, qty_s: 0},
      {name:"Bolinho", price:5.0, quantity: 12.5, qty_s: 0}
    ];
    */
  }

  addFriend() {
    this.friends.push(this.name);
    console.log(this.name);
  }

  addItem() {
    this.items.push(
      { name: this.iname
      , price: this.iprice
      , quantity: this.iqty
      , qty_s: 0 }
    );
  }

}
