$(function() {
  //1-发送ajax请求渲染列表
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandtitle',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      $('.brandtitle>ul').html(template('titleTmp', info));
    }
  })
})