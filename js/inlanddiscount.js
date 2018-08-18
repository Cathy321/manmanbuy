$(function() {
  //1-发送ajax请求, 渲染页面
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getinlanddiscount',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      $('.inland-list ul').html(template('inlandTmp', info));
    }
  })
})