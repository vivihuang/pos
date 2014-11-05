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
  if (this.count()>0) {
    for (var i=0;i<this.count();i++) {
      if (item.name == this.collection[i].name) {
        this.collection[i].amount++;
        return;
      }
    }
  }
  this.add(item);
}

function GetInput(inputs,shopping_cart) {
  var all_item = loadAllItems();
  var new_item = new LineItem();
  for (var i=0;i<inputs.length;i++) {
    new_item = CompareItem(inputs[i],all_item);
    shopping_cart.compare(new_item);
  }
  console.log(shopping_cart);
}

function CompareItem(input,all_item) {
  var new_item = new LineItem;
  var count = 1;
  if (input.indexOf("-")!=-1) {
    count = input.substring(input.indexOf("-")+1);
    input = input.substring(0,input.indexOf("-"));
  }
  for (var i=0;i<all_item.length;i++) {
    if (input == all_item[i].barcode) {
      new_item.name = all_item[i].name;
      new_item.price = all_item[i].price;
      new_item.unit = all_item[i].unit;
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
var cart = new shopping_cart();
GetInput(inputs,cart);
//console.log(cart);
