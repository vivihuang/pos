//TODO: Please write code in this file.
function LineItem(name,price,amount,unit,promotion,pro_amount) {
  this.name = name;
  this.price = price;
  this.amount = amount;
  this.unit = unit;
  this.promotion = promotion;
  this.pro_amount = pro_amount;
}

LineItem.prototype.TotalPrice = function() {
  return (this.amount-this.pro_amount)*this.price;
}

LineItem.prototype.SavePrice = function() {
  return this.pro_amount*this.price;
}

LineItem.prototype.PromotionAmount = function() {
  this.pro_amount = this.promotion*parseInt(this.amount/3);
}

LineItem.prototype.format = function() {
  var string = "名称:"+this.name+
               ",数量:"+this.amount+this.unit+
               ",单价:"+this.price.toFixed(2)+"(元)"+
               ",小计:"+this.TotalPrice().toFixed(2)+"(元)";
  return string;
}

LineItem.prototype.format_promotion = function () {
  if (this.promotion == 1) {
    var string = "名称:"+this.name+
             ",数量:"+this.pro_amount;
    return string;
  }
  return 0;
}

LineItem.prototype.value = function(input,item,count) {
  var all_promotion = loadPromotions();
  this.name = item.name;
  this.price = item.price;
  this.unit = item.unit;
  this.amount = count;
  this.promotion = all_promotion[0].compare(input);
  this.pro_amount = 0;
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
        this.collection[i].PromotionAmount();
        return;
      }
    }
  }
  this.add(item);
}

shopping_cart.prototype.print = function() {
  var string = "";
  for (var i=0;i<this.count();i++) {
    string += this.collection[i].format()+"\n";
  }
  return string;
}

shopping_cart.prototype.print_promotion = function() {
  var string = "";
  for (var i=0;i<this.count();i++) {
    if (this.collection[i].format_promotion()!=0) {
      string += this.collection[i].format_promotion()+"\n";
    }
  }
  return string;
}

shopping_cart.prototype.total_price = function() {
  var string = "";
  var totalPrice = 0;
  var savePrice = 0;
  for (var i=0;i<this.count();i++) {
    totalPrice += this.collection[i].TotalPrice();
    savePrice += this.collection[i].SavePrice();
  }
  string = "总计:"+totalPrice.toFixed(2)+"\n"+
           "节省:"+savePrice.toFixed(2)+"\n";
  return string;
}

function GetInput() {
  var cart = new shopping_cart();
  var new_item = new LineItem();
  for (var i=0;i<inputs.length;i++) {
    new_item = CompareItem(inputs[i]);
    cart.compare(new_item);
  }
  PrintOut(cart);
}

function CompareItem(input) {
  var all_item = loadAllItems();
  var new_item = new LineItem;
  var count = 1;
  if (input.indexOf("-")!=-1) {
    count = input.substring(input.indexOf("-")+1);
    input = input.substring(0,input.indexOf("-"));
  }
  for (var i=0;i<all_item.length;i++) {
    if (input == all_item[i].barcode) {
      new_item.value(input,all_item[i],count);
      break;
    }
  }
  return new_item;
}

function PrintOut(cart) {
  var string = "***<没钱赚商店>购物清单***\n"+
               "打印时间:"+GetTime()+
               "----------------------\n"+
               cart.print()+
               "----------------------\n"+
               "挥泪赠送商品:\n"+
               cart.print_promotion()+
               "----------------------\n"+
               cart.total_price()+
               "**************************";
  console.log(string);
}

function GetTime() {
  var myDate = new Date();
  var DateString = TimeToString(myDate.getFullYear())+"年"+
                   TimeToString(myDate.getMonth())+"月"+
                   TimeToString(myDate.getDate())+"日 "+
                   TimeToString(myDate.getHours())+":"+
                   TimeToString(myDate.getMinutes())+":"+
                   TimeToString(myDate.getSeconds())+"\n";
  return DateString;
}

function TimeToString(time) {
  return time < 10 ? '0' + time : time;
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
GetInput();
