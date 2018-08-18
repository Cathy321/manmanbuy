$(function() {
  //1-进入页面发送ajax渲染页面数据
  //获取couponid
  var couponid = getSearch("couponid");
  var coupontitle = getSearch("coupontitle");
  $('.header h1').html(coupontitle + "优惠券");

  $.ajax({
    url: 'http://127.0.0.1:9090/api/getcouponproduct',
    data: {
      couponid: couponid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      // var arr = [];
      // for(var i = 0; i < info.result.length; i++) {
      //   arr.unshift(info.result[i].couponProductImg);
      // }
      // console.log(arr);
      // for(var i = 0; i < arr.length; i++) {
      //   $('.modal .img').append(arr[i]);
      // }
      $('.couponproduct>ul').html(template('proTmp', info));
      //封装向模态框中添加图片的方法
      function showImg(index){
        var str =  info.result[index].couponProductImg;
        $('.modal .img').html(str);
      };
      //点击任意一项,显示模态框, 并显示对应图片
      var index;
      $(document).on('click', '.couponproduct ul li', function() {
        index = $(this).data('index');
        $('.modal').show();
        showImg(index);
      });
      //点击关闭按钮  隐藏模态框
      $('.modal .close').click(function() {
        $('.modal').hide();
      });
      //点击左右按钮 切换图片
      $('.prev').click(function() {
        index--;
        if(index < 0) {
          alert('已经是第一张图片了');
          index = 0
        }
        showImg(index);
      });
      $('.next').click(function() {
        index++;
        if(index === info.result.length) {
          alert('已经是最后一张图片了');
          index = info.result.length-1
        }
        showImg(index);
      });
    }
    
  })


  //2-点击任意一条优惠券, 弹出模态框
})