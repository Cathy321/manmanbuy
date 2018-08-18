//通过传递的参数, 可以解析出地址栏的参数值
function getSearch(name) {
  var search = location.search;
  //解析成中文
  search = decodeURI(search);
  //将?去掉
  search = search.slice(1);
  //根据&进行切割
  var arr = search.split("&");
  var obj = {};
  arr.forEach(function(v, i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  return obj[name];
};

$(function() {
  //点击返回顶部
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