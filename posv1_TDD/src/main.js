//TODO: Please write code in this file.
function printInventory(inputs) {
  var itemMan=new ItemManager(loadAllItems());
  var myPrinter=new Printer();
  myPrinter.printTicket(itemMan.getPrintMessage(inputs));
}
function Printer(){
  this.title = '***<没钱赚商店>购物清单***\n';
  this.separater = '----------------------\n';
  this.end = '**********************';
  this.saveTitle = '挥泪赠送商品：\n' ;
  this.printTicket = function(printInfo){
    var printMessage=this.title;
    printInfo[0].forEach(function(element){
      printMessage+=element;
    });
    printMessage+=this.separater;
    printMessage+=this.saveTitle;
    printInfo[1].forEach(function(element){
      printMessage+=element;
    });
    printMessage+=this.separater;
    printMessage=printMessage+"总计："+printInfo[2].toFixed(2)+"(元)\n";
    printMessage=printMessage+"节省："+printInfo[3].toFixed(2)+"(元)\n"
    printMessage+=this.end;
    console.log(printMessage);
  }
}
function ItemManager(allItems){
  this.itemList=allItems;
  this.promotionList=loadPromotions();
  this.getPrintMessage = function(inputs){
    var DetailedItems=this.getDetailInfo(this.parsedInput(inputs));
    var proType = 'BUY_TWO_GET_ONE_FREE';
    var proCodeArray=this.getPromotion(proType,this.promotionList);
    DetailedItems.forEach(function(element){
      element.getSavecount(proCodeArray);
    });
  return this.processTicketInfo(DetailedItems);
  }
}
ItemManager.prototype.parsedInput = function(inputs){
  var outArray = {};
  inputs.forEach(function(elements){
  var temp=elements.split("-");
    if(!temp[1]){
      outArray[elements] = outArray[elements] + 1 || 1;
    }
    else{
     outArray[temp[0]] = outArray[temp[0]] + parseInt(temp[1]) || parseInt(temp[1]);
    }
  });
  return outArray;
}
ItemManager.prototype.getPromotion = function(proType,promotions){
  for(var index in promotions)
    if(promotions[index].type == proType)
      return promotions[index].barcodes;
}
ItemManager.prototype.getDetailInfo=function(parsedInputs){
  var detailedArray=[];
  for(var item in parsedInputs)
    {
      var buyitem=new DetailedItem(searchitem(item,this.itemList),parsedInputs[item]);
      detailedArray.push(buyitem);
    }
  return detailedArray;
}
ItemManager.prototype.processTicketInfo=function(DetailedItems){
  var costMessage=[];
  var saveMessage=[];
  var totalCost=0;
  var totalSave=0;
  DetailedItems.forEach(function(element){
    var cost=element.price*(element.itemCount-
    element.saveCount);
    totalCost+=cost;
    costMessage.push("名称："+element.name+"，数量："+
      element.itemCount+element.unit+"，单价："+
      element.price.toFixed(2)+"(元)，小计："+cost.toFixed(2)+"(元)\n");
    if(element.saveCount){
      totalSave+=element.price*element.saveCount;
      saveMessage.push("名称："+element.name+"，数量："+
      element.saveCount+element.unit+"\n");
    }
  });
  return [costMessage,saveMessage,totalCost,totalSave];
}
function DetailedItem(item,itemCount){
  this.barcode = item.barcode;
  this.name = item.name;
  this.unit = item.unit;
  this.price = item.price || 0.00;
  this.itemCount = itemCount;
  this.saveCount = 0;
  this.getSavecount = function(Probarcodes){
    if(contains(this.barcode,Probarcodes))
        this.saveCount=this.itemCount-this.itemCount%3-Math.floor(this.itemCount/3)*2;
  }
}
function searchitem(barcode,itemArray){
    for(var i in itemArray)
      if(itemArray[i].barcode===barcode)
            return itemArray[i];
}
function contains( checkitem ,srcArray)
{
  for(var i in srcArray)
    if(srcArray[i]===checkitem)
      return true;
  return false;
}
