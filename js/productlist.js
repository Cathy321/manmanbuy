$(function() {
  //获取地址栏传递的categoryid
  var categoryid = getSearch("categoryid");
  //获取pageid
  var pageid = 1;
  // var page = 1;
  var num;
  
  //1-进入页面发送ajax请求, 渲染分类导航
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorybyid',
    data: {
      categoryid: categoryid
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var str = template('tmp', info);
      $('.cate-nav .left').html(str);
    }
  })

  //2-发送ajax请求, 渲染商品列表
  //封装渲染商品列表的方法
  renderPro();
  function renderPro() {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: {
        categoryid: categoryid,
        pageid: pageid
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var category = getSearch("category");
        info.category = category;
        var str = template('proTmp', info);
        $('.pro-list ul').html(str);
        num = Math.ceil(info.totalCount/info.pagesize);
        $('.pro-list .page select').html(template('pageTmp',{num: num}));
        $('.page select option').eq(pageid-1).prop('selected', true);
      }
    })
  }

  //3-点击上一页, 改变pageid, 改变被选中的option, 渲染对应页码的商品
  $('.prev').click(function() {
    var page = $('#selectpage option:selected').val();
    page--;
    if(page < 1) {
      page = num; 
    }
    //改变pageid
    pageid = page;
    //改变被选中的option
    $('#selectpage option').eq(page-1).prop('selected', true);
    renderPro();
  })

  //4-点击下一页, 改变pageid, 改变被选中的option, 渲染对应页码的商品
  $('.next').click(function() {
    var page = $('#selectpage option:selected').val();
    page++;
    if(page > num) {
      page = 1; 
    }
    //改变pageid
    pageid = page;
    //改变被选中的option
    $('#selectpage option').eq(page-1).prop('selected', true);
    renderPro();
  })

  //5-option值改变时, 渲染对应页面的数据
  $('#selectpage').on('change', function() {
    pageid = $('#selectpage option:selected').val();
    renderPro();
  })
})