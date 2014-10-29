//TODO: Please write code in this file.
function printInventory(inputs) {
  console.log("***<没钱赚商店>购物清单***");
  var item = loadAllItems();
  var promotion = loadPromotions();
  var output = [{sum:0,promotion:false,pro_sum:0,total:0},
                    {sum:0,promotion:false,pro_sum:0,total:0},
                         {sum:0,promotion:false,pro_sum:0,total:0},
                         {sum:0,promotion:false,pro_sum:0,total:0},
                         {sum:0,promotion:false,pro_sum:0,total:0},
                         {sum:0,promotion:false,pro_sum:0,total:0}];
  var total_price = 0;
  var save_price = 0;
  for (var i=0;i<item.length;i++) {
    for (var j=0;j<inputs.length;j++) {
      if (inputs[j].indexOf("-")!=-1) {
        var temp=inputs[j].substring(0,inputs[j].indexOf("-"));
        if (temp == item[i].barcode) {
          output[i].sum = inputs[j].substring(inputs[j].indexOf("-")+1);
        }
      }
      else if (item[i].barcode==inputs[j]) {
          output[i].sum++;
      }
    }
    for (var k=0;k<promotion[0].barcodes.length;k++) {
      if (item[i].barcode == promotion[0].barcodes[k]) {
        output[i].promotion=true;
        break;
      }
    }
  }

  for (i=0;i<item.length;i++) {
    if (output[i].sum>0) {
      if (output[i].sum>2 && output[i].promotion==true) {
          output[i].pro_sum=parseInt(output[i].sum/3);
      }
      output[i].total = item[i].price * (output[i].sum-output[i].pro_sum);
      save_price = save_price+item[i].price*output[i].pro_sum;
      total_price = total_price+output[i].total;
      console.log("名称:"+item[i].name+",数量:"+output[i].sum+item[i].unit+",单价:"+parseFloat(item[i].price).toFixed(2)+"(元),小计:"+parseFloat(output[i].total).toFixed(2)+"(元)");
    }
  }

  console.log("-----------------------");
  console.log("挥泪赠送商品:");
  for(i=0;i<item.length;i++) {
    if (output[i].pro_sum>0) {
      console.log("名称:"+item[i].name+",数量:"+output[i].pro_sum+item[i].unit);
    }
  }

  console.log("-----------------------");
  console.log("总计:"+parseFloat(total_price).toFixed(2)+"(元)");
  console.log("节省:"+parseFloat(save_price).toFixed(2)+"(元)")
  console.log("***********************")

}

var inputs = ["ITEM000001",
              "ITEM000001",
              "ITEM000001",
              "ITEM000001",
              "ITEM000001",
              "ITEM000003-2",
              "ITEM000005",
              "ITEM000005",
              "ITEM000005"];
printInventory(inputs);
