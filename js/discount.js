$(function() {
  //从地址栏获取productid
  var productid = getSearch("productid");
  console.log(productid);
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getdiscountproduct',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var str = template('infoTmp', info);
      $('.proInfo').html(str);
      $('.proCom').html(template('comTmp', info));
    }
  })
})