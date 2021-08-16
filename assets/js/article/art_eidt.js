$(function(){
    initEditor();
    initCate();
   function initCate(){
     $.ajax({
         method:'GET',
         url:'/my/article/cates',
         success:function(res){
          if(res.status!==0){
              return layer.msg('获取文章分类失败')
          }
          var htmlStr=template('tpl-cate',res);
          
          $('[name=cate_id]').html(htmlStr);
          layui.form.render();
         }
     })
   }
   // 1. 初始化图片裁剪器
   var $image = $('#image')
  
   // 2. 裁剪选项
   var options = {
     aspectRatio: 400 / 280,
     preview: '.img-preview'
   }
   
   // 3. 初始化裁剪区域
   $image.cropper(options)
   $('#upload').click(function(){
    $('[type=file]').click()
})
$('[type=file]').change(function(e){
    console.log(e);
    if(e.target.files.length==0){
        return
    }
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   
})
var art_status='已发布';
$('#save').click(function(){
    art_status='草稿';
})
$('#form-pub').submit(function(e){
    e.preventDefault();
    var fd=new FormData($(this)[0]);
   fd.append('state',art_status);
   $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    fd.append('cover_img',blob);
   vi(fd);
   function vi(fd){
    $.ajax({
        method:'POST',
        url:'/my/article/add',
        data:fd,
        contentType:false,
        processData:false,
        success:function(res){
            console.log(res);
            
          if(res.status!==0){
              return layer.msg('发表失败')
          }
          
         
       
   window.parent.intlist();
        
        }
    })
   }
  })
  
 
})

})
