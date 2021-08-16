$(function(){
getUserInfo();
$("#out").click(function(){
    //eg1
layer.confirm('你确定退出吗?', {icon: 3, title:'提示'}, function(index){
    
    
    layer.close(index);
    location.href='../../login.html';
    localStorage.removeItem('token');
  });
  
   
})
})
function intlist(){
    document.querySelector('#list').click();
    layer.msg('发表成功');

}
function getUserInfo(){
$.ajax({
    method:'GET',
    url:'/my/userinfo',
    Header:{
        Authorization: localStorage.getItem('token')||''
    },
    success:function(res){

        if(res.status!==0){
            return layer.msg('获取数据失败');
        }
       
        
     renderAvatar(res.data);
      
    }
})
}
function renderAvatar(user){
  var name=user.nickname||user.username;
  $('#welcome').html('欢迎'+name);
  if(user.user_pic!==null){
      $(".layui-nav-img").attr('src',user.user_pic).show();
      $(".text-avatal").attr('src',user.user_pic).hide();

  }else{
    $(".layui-nav-img").attr('src',user.user_pic).hide();
    $(".text-avatal").attr('src',user.user_pic).show();
  }
}