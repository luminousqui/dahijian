$(function(){
$("#go-reg").click(function(){
    $(".login").hide();
    $(".reg").show()
})
$("#go-login").click(function(){
    $(".login").show();
    $(".reg").hide()  
})

layui.form.verify({
  
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
     rep:function(value){
       var pass=$('.reg [name=password]').val();
      if (pass!==value){
          return '两次密码不一致'
      }
    }
  });  
  $("#reg-form").submit(function(e){
      e.preventDefault();
      var data = {
        username: $('#reg-username').val(),
        password: $('#reg-password').val()
      }
  
      $.post('http://www.liulongbin.top:3007/api/reguser',data,
      function(res){
       if(res.status!=0){
        return layui.layer.msg(res.message)
       }
       layer.msg(res.message)
       $("#go-login").click();
      })
  })
 $('#login-form').submit(function(e){
 e.preventDefault();
 $.post('http://www.liulongbin.top:3007/api/login',$(this).serialize(),function(res){
   if(res.status!=0){
  return  layui.layer.msg(res.message)
   }
    localStorage.setItem('token',res.token);
    location.href='../../index.html';
})
 }) 





})