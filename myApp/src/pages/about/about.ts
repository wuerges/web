import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

type Item = {name: string, price:number, quantity: number};
type Person = {name: string, items: Array<Item>};

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  people : Array<Person>;
  items : Array<Item>;
  name : string;
  iname : string;
  iprice : number;
  iqty : number;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.people = [{name: "me", items: []}];
    this.items = navParams.data;
  }

  addPerson() {
    this.people.push({name: this.name, items: []});
  }
}
