$(function() {
  //发送ajax请求数据, 渲染页面
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getcoupon',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      $('.main ul').html(template('tmp', info));
    }
  })
})