$(function() {
  //1-设置导航
  //获取地址传递的数据
  var categoryid = getSearch("categoryid");
  var category = getSearch("category");
  $('.procate').attr('href', 'productlist.html?categoryid='+categoryid+"&category=" +category);
  $('.procate').html(category + ">");

  //2-发送ajax请求 获取商品详细信息渲染到页面
  //获取productid
  var productid = getSearch("productid");
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getproduct',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      //三级导航渲染
      var arr = info.result[0].productName.split(" ");
      arr = arr[0];
      $('.proname').html(arr+">");
      //商品详情标题
      $('.detail>p').html(info.result[0].productName);
      //商品详情图片
      $('.detail .pic').html(info.result[0].productImg);
      //商品购买详情
      var str = template('gobuyTmp', info);
      $('.gobuy').html(str);
    }
  })

  //3-发送ajax请求, 获取对应的用户评论渲染到页面中
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproductcom',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var str = template('comTmp', info);
      $('.comment').html(str);
    }
  })
})