$(function() {
  //1.进入页面渲染菜单栏
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getindexmenu',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var htmlStr = template('navTmp', info);
      $('.nav ul').html(htmlStr);
    }
  })

  //2-进入页面渲染折扣列表
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getmoneyctrl',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var str = template('proTmp', info);
      $('.product ul').html(str);
    }
  })

  //3-点击'更多'切换菜单的显示与隐藏
  $('.nav').on('click', '#more', function(e) {
    e.preventDefault();
    $('li.hide').toggle();
  })

  //4-点击返回顶部
    //获取页面卷曲高度
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
  })
    //点击回到顶部
  $('.gotop').click(function() {
    $('html, body').animate({
      scrollTop: 0
    })
  })

})