$(function() {
  //1-进入页面, 发送ajax请求, 渲染品牌标题对应的十大品牌
  var brandtitleid = getSearch("brandtitleid");
  var brandtitle = getSearch("brandtitle");
  var productid;
  $('.device p.brand').html(brandtitle+"哪个牌子好");
  $('.device p.saleorder').html(brandtitle+"产品销量排行");
  $('.device p.com').html(brandtitle+"最新评论");
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrand',
    data: {
      brandtitleid: brandtitleid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      $('.order').html(template('orderTmp', info));
    }
  })

  //2-渲染商品销售排行列表
  var pagesize;
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandproductlist',
    data: {
      brandtitleid: brandtitleid,
      pagesize: 4
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var name ="<p>"+info.result[0].productName+"</p>";
      var img =info.result[0].productImg;
      var str = img+""+name;
      $('.sale-list>ul').html(template('saleTmp', info));
      //3-渲染评论内容
      productid = $('.sale-list>ul>li').eq(0).data('productid');
      $.ajax({
        url: 'http://127.0.0.1:9090/api/getproductcom',
        data: {
          productid: productid
        },
        dataType: 'json',
        success: function(data) {
          data.str = str;
          console.log(data);
          $('.newCom').html(template('comTmp',data));
        }
      })
    }
  })

  
})