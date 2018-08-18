$(function() {
  //1-进入页面发送ajax渲染页面数据
  //定义pageid
  var pageid = 0;
  var num;
  render();
  function render() {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var str = template('proTmp', info);
        $('.product>ul').html(str);
        num = Math.ceil(info.totalCount/info.pagesize);
        $('.page select').html(template('pageTmp',{num: num}));
        $('.page select option').eq(pageid).prop('selected', true);
      }
      
    })
  }
  

  //2-点击上一页, 改变pageid, 改变被选中的option, 渲染对应页码的商品
  $('.prev').click(function() {
    var page = $('#selectpage option:selected').val();
    page--;
    if(page < 1) {
      page = num;
    }
    pageid = page - 1;
    $('#selectpage option').eq(pageid).prop('selected', true);
    render();
  })

  //3-点击下一页, 改变pageid, 改变被选中的option, 渲染对应页码
  $('.next').click(function() {
    var page = $('#selectpage option:selected').val();
    page++;
    if(page > num) {
      page = 1;
    }
    pageid = page - 1;
    $('#selectpage option').eq(pageid).prop('selected', true);
    render();
  })

  //4-监听select的变化, 根据变化渲染对应页面
  $('#selectpage').on('change', function() {
    pageid = $('#selectpage option:selected').val() - 1;
    render();
  })
})