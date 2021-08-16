$(function () {
    layui.form.verify({
        samePwd: function (value) {
            if (value === $('#oldPwd').val()) {
                return '新旧密码需要不一致！'
            }
        },

        rePwd: function (value) {
            if (value != $('#newPwd').val()) {
                return '两次密码不一致'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });
    $(".layui-form").submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            Header:{
                Authorization: localStorage.getItem('token')||''
            },
            data:$(".layui-form").serialize(),
            success:function(res){
                     $('.layui-form')[0].reset();
                    return layer.msg(res.message)
                
            }
        })
        
    })
    

})  
