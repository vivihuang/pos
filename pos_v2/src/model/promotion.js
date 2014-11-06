function Promotion(type, barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}

Promotion.prototype.compare = function(input) {
  for (var i=0;i<this.barcodes.length;i++) {
    if (input == this.barcodes[i]) {
      return 1;
    }
  }
  return 0;
}
