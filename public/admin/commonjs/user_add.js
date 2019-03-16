$(function(){
    $("#commit").click(function(){
        let aform = new FormData($("#user_form")[0]);
        
            // aform.append('icon',$('#picID')[0].files[0]);
        if($('#picID')[0].files.length > 0){
            aform.append('icon',$('#picID')[0].files[0]);
        }else{
            aform.append('icon','');
        }
        
        aform.append("user",$("#username").val());
        aform.append("psd",$("#password").val());
        aform.append("nik",$("#nikename").val());
        aform.append("follow",$("#follow").val());
        aform.append("fans",$("#fans").val());
        aform.append("collection","user_info");
        aform.append("time",Date.now())
        // console.log($("#user_form")[0])
        //----------由于有文件和数据要一起上传，所以必须要所有内容以流形式上传，否则后端无法获取数据------------
        // let data = {
        //     user : $("#username").val(),
        //     psd : $("#password").val(),
        //     nik : $("#nikename").val(),//昵称
        //     follow : $("#follow").val(),//关注
        //     fans : $("#fans").val(),//粉丝
        //     icon : aform,//头像
        //     collection : "user_info"
        // }
        // console.log(data);
        // console.log(11111111111111)
        $.ajax({
            url : "/admin/user_add.html/userSub",
            type : "post",
            data : aform,
            // async: false,
            processData:false,
            contentType: false,
            success:function(res){
                // console.log(res)
                // console.log(res instanceof Object)
                if(res == "1"){
                    location.href = "/admin/user.html"
                }else if(res instanceof Object){
                    // console.log(1111111111)
                    location.href = "/admin/user.html?" + "p=" + res.page;
                }
            },
            error:function(err){
                console.log("err:",err)
            }
        })
    })
})

