import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

type Item = {name: string, price:number, quantity: number, qty_s: number};
type Person = {name: string, items: Array<Item>};

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  friends : Array<Person>;
  items : Array<Item>;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.friends = []
    for (let f of navParams.data.friends) {
      console.log("f.name: " +  f);
      this.friends.push({name: f, items: []});
    }
    this.items = navParams.data.items;
  }

  total(f): number {
    var t = 0;
    for (let i of f.items) {
      t += i.price * i.quantity;
    }
    return t;
  }

  groupItems(is : Array<Item> ) {
    // TODO
  }

  transfer(i, f) {
    let s = i.quantity * i.qty_s / 100;
    i.qty_s = 0;
    i.quantity = i.quantity - s;
    if (s > 0) {
      f.items.push({name: i.name, price: i.price, quantity: s, qty_s: 0});
    }
  }

  sendItemToFriend(f) {
    //console.log("sent to: " +  fname);

    for(let i of this.items) {
      this.transfer(i, f);
    }
    this.items = this.items.filter(i => i.quantity > 0);
    this.groupItems(this.items);

    for(let fi of this.friends) {
      for(let i of fi.items) {
        this.transfer(i, f);
      }
      fi.items = fi.items.filter(i => i.quantity > 0);
      this.groupItems(fi.items);
    }

  }
}
