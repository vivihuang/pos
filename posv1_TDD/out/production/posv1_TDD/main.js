function printInventory(inputs) {
  var itemCart = new ItemsInCart();
  getInputs(inputs,itemCart)
}

function getInputs(inputs,itemCart) {
  inputs.forEach(function (element) {
    var singleItem = inputCompare(input);
    itemCart.compare(singleItem);
  });
}

function inputCompare(input) {
  var allItems = loadAllItems();
  allItems.forEach(function(element) {
    var item = new Item(element);
    item.compare(input);
  });
  return singleItem;
}

function Items(barcode,name,unit,price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price;
  this.amount = 0;
  this.saveAmount = 0;
  this.totalPrice = 0;
}

Items.prototype.compare = function(input){
  if (input == this.barcode) {
    this.amount++;
    this.totalPrice = this.amount*this.price;
  }
}

function ItemsInCart(){
  this.items=[];
}

ItemsInCart.prototype.compare = function(item){

}
