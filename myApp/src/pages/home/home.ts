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
  items : Array<{name: string, price:number, quantity: number}>;
  friends : Array<string>;


  constructor(public navCtrl: NavController) {
    this.clearItems();
    this.items = [
      {name:"Cerveja", price:10.0, quantity: 2.5},
      {name:"Bolinho", price:5.0, quantity: 12.5}
    ];
  }

  loadItems() {
    //this.navCtrl.push(AboutPage, this.data);
  }

  clearItems() {
    this.friends = ["me"];
    // this.items   = [];
    this.items = [
      {name:"Cerveja", price:10.0, quantity: 2.5},
      {name:"Bolinho", price:5.0, quantity: 12.5}
    ];
  }

  addFriend() {
    this.friends.push(this.name);
    console.log(this.name);
  }

  addItem() {
    this.items.push(
      { name: this.iname
      , price: this.iprice
      , quantity: this.iqty }
    );
  }

}
