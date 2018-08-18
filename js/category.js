$(function() {
  //进入页面发送ajax请求, 渲染一级分类
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var str = template('cateTmp', info);
      $('.cate ul').html(str);
    }
  })

  //点击展开二级分类并改变箭头方向
  $('.cate').on('click', 'ul>li>a', function() {
    var titleId = $(this).data('titleid');
    //发送ajax获取数据渲染二级分类
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getcategory',
      data: {
        titleid: titleId
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var str = template('secondTmp', info);
        $('.secondCate').html(str);
      }
    })
    $(this).toggleClass('down').toggleClass('up');
    $(this).siblings().toggle();
  })
})