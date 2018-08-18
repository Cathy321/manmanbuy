$(function() {
  //1-发送ajax请求 渲染菜单栏
  //定义宽度, 给ul设置
  var width = 1;
  var maxMove;
  var titleid = 0;
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      $('.menu>ul').html(template('menuTmp', info));
      //遍历动态生成的li的个数, 重新给width赋值
      for(var i = 0; i < info.result.length; i++) {
        width += $('.menu li').eq(i).outerWidth(true);
      }
      console.log(width);
      //设置ul的宽度
      $('.menu>ul').css({
        width: width
      });
      console.log( $('.menu>ul').outerWidth());
      //计算ul的最大滑动出去距离,应为menu的宽度-ul的宽度(为负值)
      maxMove = $('.menu').outerWidth() - width;
      console.log(maxMove);
    }
  })

  //2-点击每个菜单导航 发送ajax请求 获取数据渲染页面
  renderSp();
  function renderSp() {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      data: {
        titleid: titleid
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        $('.product ul').html(template('spTmp', info));
      }
    })
  }
  $(document).on('click', '.menu>ul>li', function() {
    $(this).addClass('current').siblings().removeClass('current');
    titleid = $(this).data('titleid');
    console.log(titleid);
    renderSp();
  })

  
  //3-注册触屏滑动事件
  var menu = document.querySelector('.menu');
  var ul = menu.querySelector('ul');
  var  startX = 0; //记录触屏起始是坐标值
  var  moveX = 0;  //记录手指移动最新坐标值
  var  distanceX = 0;  //记录差值 
  var centerX = 0;
  ul.ontouchstart = function (e) {
      startX = e.targetTouches[0].clientX; //起点坐标值
  }
  ul.ontouchmove = function (e) {
      moveX = e.targetTouches[0].clientX; //移动坐标值
      distanceX = moveX - startX;  //计算差值
      var tmpX = centerX + distanceX;
      // if(tmpX >= maxMove) {
      //   tmpX = maxMove;
      // }
      ul.style.transition = 'none';
      ul.style.transform = 'translateX(' + tmpX + 'px)';
  }
  ul.ontouchend = function (e) {
      centerX += distanceX;
      // console.log(centerX);
      if(centerX >= 0) {
        centerX = 0;
        ul.style.transition = 'transform .5s';
        ul.style.transform = 'translateX(0px)';
      }
      else if(centerX <= maxMove) {
        centerX = maxMove;
        ul.style.transition = 'transform .5s';
        ul.style.transform = 'translateX(' + centerX + 'px)';
      }
  }

})