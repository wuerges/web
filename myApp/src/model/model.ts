export class Item {
  name         : string;
  price        : number;
  quantity     : number;
  quantity_set : number;

  constructor(
    name         : string,
    price        : number,
    quantity     : number,
    quantity_set : number
  ) {
    this.name         = name;
    this.price        = price;
    this.quantity     = quantity;
    this.quantity_set = quantity_set;
  }

  priceSh() {
    return (this.price * this.quantity 
      * this.quantity_set / 100).toFixed(2);
  }

  priceRemSh() {
    return ((this.price * this.quantity) - 
      (this.price * this.quantity 
       * this.quantity_set / 100)).toFixed(2);
  }

  quantitySh() {
    return this.round(this.quantity 
      * this.quantity_set / 100);
  }

  quantityRemSh() {
    return this.round(this.quantity - 
      (this.quantity 
       * this.quantity_set / 100));
  }

  percentageSh() {
    return this.round(this.quantity_set);
  }

  percentageRemSh() {
    return this.round(100 - this.quantity_set);
  }

  round(n) {
    let r = (n * 100) % 1;
    return (n * 100 - r) / 100;
  }

  increase_set() {
    let s = 100 / this.quantity;
    if(this.name == "Tip") {
      s = 5;
    }

    if (this.quantity_set < 100)
      this.quantity_set += s;
    if (this.quantity_set > 100)
      this.quantity_set = 100;
  }

  decrease_set() {
    let s = 100 / this.quantity;
    if(this.name == "Tip") {
      s = 5;
    }

    if (this.quantity_set > 0)
      this.quantity_set -= s;
    if (this.quantity_set < 0)
      this.quantity_set = 0;
  }
  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 0)
      this.quantity--;
  }


}

export class Friend {
  name  : string;
  items : Array<Item>;

  constructor(a_name: string) {
    this.name = a_name;
    this.items = [];
  }

  total(): number {
    var t = 0;
    for (let i of this.items) {
      t += i.price * i.quantity;
    }
    return t;
  }

  addItem(name, price, qty) {
    for(let i of this.items) {
      if (i.name == name 
          && i.price == price) {
        i.quantity += qty;
        return;
      }
    }
    //console.log("tried to add item:" 
    //            + name + " "
    //            + price + " "
    //            + qty);
    this.items.push(
      new Item(name, price, qty, 0));
  }

}

export class AppState {
  unassigned : Array<Item>;
  friends    : Array<Friend>;
  paid       : Array<Friend>;

  constructor() {
    this.friends    = [new Friend("me")];
    this.paid       = [];
    this.unassigned = [];

    //this.friends[0].addItem("T1", 1, 2);
    //this.friends[0].addItem("T2", 1, 2);
  }

  addFriend(name : string) {
    if(!name) return;
    this.getFriendOrAdd(this.friends, name);
  }

  addItem(name, price, qty) {
    if(!name)  return;
    if(!price) return;
    if(!qty)   return;
    for(let i of this.unassigned) {
      if (i.name == name)
        return;
    }
    this.unassigned.push(
      new Item(name, price, qty, 0));
  }

  splitEqually(i : Item) {
    let qt = i.quantity / this.friends.length;

    for (let f of this.friends) {
      f.addItem(i.name, i.price, qt);
    }
    i.quantity = 0;

    this.unassigned = this.unassigned.filter(i => i.quantity > 0);
  }

  transfer(i, f) {
    let s = i.quantity * i.quantity_set / 100;
    i.quantity_set = 0;
    i.quantity = i.quantity - s;
    if (s > 0) {
      f.addItem(i.name, i.price, s);
    }
    console.log("tried to add item:" 
                + i.name + " "
                + i.price + " "
                + i.qty);
  }

  groupItems(is : Array<Item> ) {
    // TODO
  }

  sendItemToFriend(f) {
    console.log("sent to: " +  f.name);

    for(let i of this.unassigned) {
      this.transfer(i, f);
    }
    this.unassigned = this.unassigned.filter(i => i.quantity > 0);
    this.groupItems(this.unassigned);

    for(let fi of this.friends) {
      for(let i of fi.items) {
        this.transfer(i, f);
      }
      fi.items = fi.items.filter(i => i.quantity > 0);
      this.groupItems(fi.items);
    }

  }

  getFriendOrAdd(fs : Array<Friend>, name : string) {
    for(let f of fs) {
      if (f.name == name)
        return f;
    }
    let f = new Friend(name)
    fs.push(f);
    return f;
  }

  transferAll(f : Friend, p : Friend) {
    for(let i of f.items) {
      p.addItem(i.name, i.price, i.quantity);
    }
    f.items = []
  }

  nonEmptyPaid() : Array<Friend> {
    return this.paid.filter(f => f.total() > 0);
  }

  nonEmptyFriends() : Array<Friend> {
    return this.friends.filter(f => f.total() > 0);
  }

  nonTipItems() : Array<Item> {
    return this.unassigned.filter(i => i.name != "Tip");
  }

  /*
  clearEmptyFriends() {
    this.friends = 
      this.friends.filter(f => f.total() > 0);
    this.paid = 
      this.paid.filter(f => f.total() > 0);
  }
  */

  payFor(f : Friend) {
    let p = this.getFriendOrAdd(this.paid, f.name);
    this.transferAll(f, p);
    //this.clearEmptyFriends();
  }
  unpayFor(f : Friend) {
    let p = this.getFriendOrAdd(this.friends, f.name);
    this.transferAll(f, p);
    //this.clearEmptyFriends();
  }


  unassToJSON():string {
    return JSON.stringify(this.unassigned);
  }

  JSONToUnass(j: string) {
    let is = JSON.parse(j);
    for (let i of is) {
      this.addItem(i.name, i.price, i.quantity);
    }
  }

  accountForTip(tip : number) {
    let t = 0;
    for(let i of this.unassigned) {
      if (i.name != "Tip" && i.name != "Tax") {
        t += i.price * i.quantity;
      }
    }
    this.addItem("Tip", t * tip / 100, 1);
  }
}
