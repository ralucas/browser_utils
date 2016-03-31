function isInt(n) {
    return n % 1 === 0;
}

var layoutDesignHelper = function (base, num) {
    var out = [];
    var rem = num % base;
    var bb = rem / 2;

    if (!isInt(Math.sqrt(rem))) {
        rem += base;
    }
    
    var baseArr = new Array(Math.floor((num-rem)/base)).fill(base);
    var sq = base * base;
    var sub = sq - num;
    var bbSize = (bb + sub)/bb;
    var len = base - baseArr.length
    var sm = bb * Math.sqrt(bbSize);
    var rx = base - sm + 1;
    
    for(var i = 0; i < len; i++) {
      out.push(rx)
    }
    
    return {
      lengths: out.concat(baseArr),
      bigBlockSize: bbSize,
      bigBlocks: bb
    };
}

var createLayoutArr = function(base, total) {
  var output = [];
  var layoutDesign = layoutDesignHelper(base, total);
  var rowLengths = layoutDesign.lengths;
  for (var i = 0; i < base; i++) {
    var row = [];
    var cols = base - rowLengths[i];
    var j = cols;
    for (j; j < base; j++) {
      var col = j === cols ? 0 : j;
      var dimension = (j+1) - col;
      if (j === cols && cols > 0) {
        if (i === 0) row.push({row: i, col: col, w: dimension, h: dimension});
      } else {
        row.push({row: i, col: col, w: dimension, h: dimension});
      }
    }
    output.push(row);
  }
  return output;
}
