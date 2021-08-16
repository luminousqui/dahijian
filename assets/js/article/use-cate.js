$(function(){
    initArtList();
    function initArtList(){
      $.ajax({
       method:'GET',
       url:'/my/article/cates',
       Header:{
        Authorization:localStorage.getItem('token')
       },
       success:function(res){
    var html=template('art-table',res);
     $('tbody').html(html);
           
       }
      })

    }
    var index=null;
    // 添加类别
    $('#add').click(function(){
        index = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加类别'
            ,content: $('#art-add').html()
          });     
            
    })
    $("body").on('submit','#form-add',function(e){
        e.preventDefault();
       $.ajax({
           method:'POST',
           url:'/my/article/addcates',
           data:$(this).serialize(),
           success:function(res){
            if(res.status1!==0){
                layer.msg('添加失败')
            }
            initArtList();
            layer.msg('添加成功')
            layer.close(index)
           }
       }) 

    })
 // 修改类别
    $('body').on('click','.btn-edit',function(){
        index = layer.open({
            type:1,
            area:['500px','250px'],
            title: '编辑类别'
            ,content: $('#art-edit').html()
          });     
       var Id =$(this).attr('data-id');
       $.ajax({
           method:'GET',
           url:'/my/article/cates/'+Id,
           success:function(res){

            if(res.status!==0){
                return layer.msg('获取数据失败')
            }
           layui.form.val("form-edit",res.data);
          
           }
       })
       
            
    })
    $("body").on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
             if(res.status!==0){
                 layer.msg('修改失败')
             }
             initArtList();
             layer.msg('修改成功');
             layer.close(index);
             initArtList();
            }
        }) 
    })
    // 删除类别
    $('body').on('click','.btn-del',function(){
        var Id =$(this).attr('data-id');
        layer.confirm('确定删除吗', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+Id,
                success:function(res){
                 if(res.status!==0){
                     return layer.msg('删除数据失败')
                 }
                 initArtList();
                 layer.msg('删除成功');
                 initArtList();
                }
            })
            layer.close(index);
          });  
       
      
       
            
    })
})