$(function(){
    $("#search_btn").click(function(){
        // $("#search_input").val()
        // console.log(window.location.href);
        if(!window.location.href.includes("search=")){
            // console.log(111111111111)
            if(window.location.href.includes("?")){
                if(window.location.href.includes("p=")){
                    let tmp = window.location.href + "&" + "search=" + $("#search_input").val();
                    let tmp2 = tmp.replace(/p=[\w]*/g,"p=0");
                    window.location.href = tmp2
                }else{
                    window.location.href += "&" + "search=" + $("#search_input").val()
                }
            }else{
                window.location.href += "?" + "search=" + $("#search_input").val() 
            }

            
        }else if($("#search_input").val() !== ''){
            // console.log(2222222222)
            let tmp = window.location.href.replace(/search=[\w]*/g,"search=" + $("#search_input").val());
            let tmp2 = ''
            if(tmp.includes('p=')){
                tmp2 = tmp.replace(/p=[\w]*/g,"p=0");
                // alert(tmp2)
                window.location.href = tmp2
                
            }else{
                window.location.href = tmp;
            }
            
        }else{
            let tmp = window.location.href.replace(/search=[\w]*/g,"");
            let tmp2 = ''
            if(tmp.includes('p=')){
                tmp2 = tmp.replace(/p=[\w]*/g,"p=0");
                // alert(tmp2)
                window.location.href = tmp2
                
            }else{
                window.location.href = tmp;
            }
        }
    })



    $("#search_all_btn").click(function(){
        window.location.href = window.location.href.includes("?") ? window.location.href += "&show=all" : window.location.href + "?show=all"


    })


})