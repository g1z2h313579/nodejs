$(function(){
    const login = document.querySelector("#login");
    login.addEventListener("click",function(e){
        e.preventDefault();
        const user = document.querySelector("#login-username");
        const psd = document.querySelector("#login-password");
        $.ajax({
            url:"/admin/login.html",
            type:"post",
            data:{
                user:user.value,
                psd:psd.value
            },
            success:(res)=>{
                // console.log(res)
                if(res == "success"){
                    // alert(res)
                    location.href = "/admin/home.html"
                }else if(res == "error"){
                    location.href = "/admin/error.html"
                }
            },
            error:(err)=>{
                console.log(err)
            }
        })

    })

})
