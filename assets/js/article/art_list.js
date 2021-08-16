$(function () {
    
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
     initList();
     initCate();
    //  定义渲染列表方法
    function initList() {  
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('获取数据失败')
                }
                
                 
                var html=template('tpl-table',res);
                $('tbody').html(html);
                renderPage(res.total)
            }
        })
    }
// 定义分类列表方法
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('获取数据失败')
                }
                
                var html=template('tpl-cate',res);
             
                $('#cate_id').html(html);
                layui.form.render();
            }
        })
    }
    // 定义筛选方法
$('#form-serch').submit(function(e){
    e.preventDefault();
    q.cate_id=$('[name=cate_id]').val();
    q.state=$('[name=state]').val();
    initList();
})

// 渲染分页方法
   function renderPage(total){
       
   layui.laypage.render({
    elem:'page',
    count:total,
    limit:q.pagesize,
    curr:q.pagenum,
    limits:[2,3,5,10],
    layout:['count','limit','prev', 'page', 'next','skip'],
    jump:function(obj,first){
          q.pagesize=obj.limit
        q.pagenum=obj.curr;
        if(!first){
            initList()
          }
    }
   })
   }

   $('body').on('click','.btn-delete',function(){
       var id=$(this).attr('data-id')
       
       var length=$('.btn-delete').length;
       layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
       $.ajax({
      method:'GET',
      url:'/my/article/delete/'+id,
      success:function(res){
          console.log(res);
          
       if(res.status!==0){
         return  layer.msg('删除失败');
       }
       layer.msg('删除成功');
       if(length==1){
        q.pagenum=q.pagenum==1?q.pagenum:q.pagenum-1;
        
       }
       initList();
      }
       })
      });
   })
})
