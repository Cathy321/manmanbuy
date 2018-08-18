$(function() {
  var shopid = 0;
  var areaid = 0;
  renderShop();
  renderArea();
  function renderShop() {
    //1-发送ajax, 请求数据, 渲染店铺列表
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getgsshop',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        //设置默认选中的店铺, 并记录shopid
        var selectedShop = info.result[0].shopName;
        var id = info.result[0].shopId;
        $('.gs-nav .selectedShop')[0].dataset.shopid = id;
        $('.gs-nav .selectedShop').html(selectedShop);
        $('.second-nav .shop').html(template('shopTmp', info));
      }
    });
  }
  function renderArea() {
    //2-发送ajax, 请求数据, 渲染地区列表
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getgsshoparea',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        //设置默认选中的地区, 并将areaId存入
        var selectedArea = info.result[0].areaName.substr(0, 2);
        var id = info.result[0].areaId;
        $('.gs-nav .selectedArea')[0].dataset.areaid = id;
        $('.gs-nav .selectedArea').html(selectedArea);
        $('.second-nav .area').html(template('areaTmp', info));
      }
    });
  }

  //3-进入页面渲染默认店铺和地区的商品
  //获取默认的店铺id 和 地区id
  // var shopid = $('.gs-nav .selectedShop').data('shopid');
  // var areaid = $('.gs-nav .selectedArea').data('areaid');
  renderProduct(shopid, areaid);
  function renderProduct(shopid, areaid) {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getgsproduct',
      data: {
        shopid: shopid,
        areaid: areaid
      },
      success: function(info) {
        console.log(info);
        $('.gs-product>ul').html(template('proTmp', info));
      }
    })
  }

  //4-点击店铺,显示店铺下拉列表
  $('.selectedShop').click(function() {
    $('.second-nav .shop').toggle();
  })
  //5-选中店铺, 添加current类名 重新获取shopid和areaid, 切换导航店铺, 重新渲染商品
  $(document).on('click', '.second-nav>.shop>li', function() {
    $(this).addClass('current').siblings().removeClass('current');
    $('.gs-nav .selectedShop').text($(this).text());
    $('.gs-nav .selectedShop').data('shopid', $(this).data('shopid'));
    shopid = $(this).data('shopid');
    areaid = $('.gs-nav .selectedArea').data('areaid');
    console.log(shopid, areaid);
    renderProduct(shopid, areaid);
    $('.second-nav .shop').hide();
  })

  //6-点击地区, 显示地区下拉列表
  $('.selectedArea').click(function() {
    $('.second-nav .area').toggle();
  })
  //7-选中地区, 添加current类名 重新获取shopid和areaid, 切换导航地区, 重新渲染商品
  $(document).on('click', '.second-nav>.area>li', function() {
    $(this).addClass('current').siblings().removeClass('current');
    $('.gs-nav .selectedArea').text($(this).text().substr(0, 2));
    $('.gs-nav .selectedArea').data('areaid', $(this).data('areaid'));
    areaid = $(this).data('areaid');
    shopid = $('.gs-nav .selectedShop').data('shopid');
    console.log(shopid, areaid);
    renderProduct(shopid, areaid);
    $('.second-nav .area').hide();
  })
})