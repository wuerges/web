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
}

export class Friend {
  name  : string;
  items : Map<string, Item>;

  constructor(a_name: string) {
    this.name = a_name;
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
  }

  addFriend(name : string) {
    if(!name) return;
    for(let f of this.friends) {
      if (f.name == name)
        return;
    }
    this.friends.push(new Friend(name))
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

}
