$(function() {
  //1-进入页面发送ajax请求, 渲染数据
  //从地址栏获取productid
  var productid = getSearch("productid");
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
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