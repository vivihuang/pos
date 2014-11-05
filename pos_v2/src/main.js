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
  var string = ""
  return
}
