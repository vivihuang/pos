function printInventory(inputs) {
    var itemCart = new ItemsInCart();
    getInputs(inputs,itemCart);
    itemCart.getPromotions();
    printResult(itemCart);
}

function getInputs(inputs,itemCart) {
    inputs.forEach(function (element) {
        if (inputCompare(element)) {
            itemCart.addItems(inputCompare(element));
        }
    });
}

function inputCompare(input) {
    var allItems = loadAllItems();
    var result = false;
    var count = 1;
    if (input.indexOf("-")!=-1) {
        count = input.substring(input.indexOf("-")+1);
        input = input.substring(0,input.indexOf("-"));
    }
    allItems.forEach(function(element) {
        var item = new Item(element);
        if (item.compare(input,count)) {
            result = item;
            return result;
        }
    });
    return result;
}

function printResult(itemCart){
    var title = "***<没钱赚商店>购物清单***\n";
    var divider = "----------------------\n";
    var promotionTitle = "挥泪赠送商品：\n";
    var endingLine = "**********************";
    var result = title+itemCart.print()+divider+
        promotionTitle+itemCart.printPromotions()+divider+
        itemCart.getTotalPrice()+endingLine;
    console.log(result);
}

function Item(element) {
    this.barcode = element.barcode;
    this.name = element.name;
    this.unit = element.unit;
    this.price = element.price;
    this.amount = 0;
    this.saveAmount = 0;
}

Item.prototype.totalPrice = function () {
    return this.price*(this.amount-this.saveAmount);
}

Item.prototype.savePrice = function () {
    return (this.price*this.saveAmount);
}

Item.prototype.compare = function(input,count){
    if (input == this.barcode) {
        this.amount = count;
        return true;
    }
    return false;
}

Item.prototype.check = function (inputItem) {
    if (inputItem.barcode == this.barcode) {
        this.amount++;
        return true;
    }
    return false;
}

Item.prototype.getPromotion = function () {
    var allPromotions = loadPromotions()[0].barcodes;
    for (var index in allPromotions) {
        if (this.barcode == allPromotions[index]) {
            this.saveAmount = parseInt(this.amount/3);
            break;
        }
    }
    return this.saveAmount;
}

Item.prototype.printResult = function() {
    var string = "名称："+this.name+"，数量："+this.amount+this.unit+
        "，单价："+this.price.toFixed(2)+"(元)，小计："+
        this.totalPrice().toFixed(2)+"(元)\n";
    return string;
}

Item.prototype.printPromotionResult = function() {
    var string = "";
    if (this.saveAmount) {
        string = "名称："+this.name+"，数量："+this.saveAmount+this.unit+"\n";
    }
    return string;
}

function ItemsInCart(){
    this.items=[];
}

ItemsInCart.prototype.getLength = function(){
    return this.items.length;
}

ItemsInCart.prototype.addItems = function(item){
    var result = false;
    if (this.getLength()) {
        this.items.forEach(function(element) {
            if (element.check(item))
                result = true;
        });
    }
    if (!result)
        this.items.push(item);
}

ItemsInCart.prototype.getPromotions = function() {
    this.items.forEach(function(element){
        element.getPromotion();
    });
}

ItemsInCart.prototype.print = function () {
    var string = "";
    this.items.forEach(function(element){
        string += element.printResult();
    });
    return string;
}

ItemsInCart.prototype.printPromotions = function () {
    var string = "";
    this.items.forEach(function(element){
        string += element.printPromotionResult();
    });
    return string;
}

ItemsInCart.prototype.getTotalPrice = function(){
    var totalPrice = 0;
    var savePrice = 0;
    this.items.forEach(function (element) {
        totalPrice += element.totalPrice();
        savePrice += element.savePrice();
    });
    var string = "总计："+totalPrice.toFixed(2)+"(元)\n"+"节省："+savePrice.toFixed(2)+"(元)\n";
    return string;
}

