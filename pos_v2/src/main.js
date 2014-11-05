//TODO: Please write code in this file.
function LineItem(name,price,amount,unit) {
  this.name = name;
  this.price = price;
  this.amount = amount;
  this.unit = unit;
}

LineItem.prototype.TotalPrice = function() {
  return this.amount*this.price;
}

LineItem.prototype.format = function() {
  var string = "名称:"+this.name+
               ",数量:"+this.amount+this.unit+
               ",单价:"+this.price.toFixed(2)+"(元)"+
               ",小计:"+this.TotalPrice.toFixed(2)+"(元)";
  return string;
}

var shopping_cart = function() {
  this.collection = [];
}

shopping_cart.prototype.add = function(item) {
  this.collection.push(item);
}

shopping_cart.prototype.count = function() {
  return this.collection.length;
}

shopping_cart.prototype.compare = function(item) {
  for (var i=0;i<shopping_cart.count();i++) {
    if (item.name == shopping_cart[i].name) {
      return i;
    }
    else if (i == shopping_cart.count()-1) {
      return -1;
    }
  }
}

function GetInput(inputs) {
  var all_item = loadAllItems();
  var new_item = new LineItem();
  var temp = 0;
  for (var i=0;i<inputs.length;i++) {
    new_item = CompareItem(inputs[i],origin_item);
    temp = shopping_cart.compare(new_item);
    if (temp == -1) {
      shopping_cart.add(new_item);
    }
    else {
      shopping_cart[temp].amount++;
    }
  }
}

function CompareItem(input,all_item) {
  var origin_item = new Item;
  var new_item = new LineItem;
  var count = 1;
  if (input.indexOf("-")!=-1) {
    input = input.substring(0,input.indexOf("-"));
    count = input.substring(input.indexOf("-")+1);
  }
  for (var i=0;i<all_item.length;i++) {
    origin_item = Item(all_item[i]);
    if (input == origin_item.barcode) {
      new_item.name = origin_item.name;
      new_item.price = origin_item.price;
      new_item.unit = origin_item.unit;
      new_item.amount = count;
      break;
    }
  }
  return new_item;
}

var inputs = [
              'ITEM000001',
              'ITEM000001',
              'ITEM000001',
              'ITEM000001',
              'ITEM000001',
              'ITEM000003-2',
              'ITEM000005',
              'ITEM000005',
              'ITEM000005'
              ];
