    //--------------渲染页面------------------------------
const comconfig = require("./comconfig");
    // let userP = {...comconfig};

    // let dbdata = [];
   function _render(result,userP,req,res){
        // console.log(req.query)
        let curUrl = req.query.search ? `search=${req.query.search}` : '';
        if(!req.query.p){
            dbdata = result.slice(comconfig.page_start * userP.page_count,comconfig.page_start * userP.page_count + userP.page_count)
        }else{
            //利用url传值确定页数
            userP.page_start = req.query.p;
            dbdata = result.slice(userP.page_start * userP.page_count,userP.page_start * userP.page_count + userP.page_count)
        }
        // console.log(req.query.search)
        let data = {
            active:"user",
            icon : res.count_info.icon,
            bread : "user",
            userName : res.count_info.nik,
            result : result,
            dbdata : dbdata,
            userP : userP,
            query : req.query,
            curUrl : curUrl
        }  
        
        // console.log("result",result)
        res.render("user",data);
    }



    function _renderPro(result,userP,req,res){
        // console.log(req.query)
        let curUrl = req.query.search ? `search=${req.query.search}` : '';
        if(!req.query.p){
            dbdata = result.slice(comconfig.page_start * userP.page_count,comconfig.page_start * userP.page_count + userP.page_count)
        }else{
            //利用url传值确定页数
            userP.page_start = req.query.p;
            dbdata = result.slice(userP.page_start * userP.page_count,userP.page_start * userP.page_count + userP.page_count)
        }
        // console.log(req.query.search)
        let data = {
            active:"product",
            icon : res.count_info.icon,
            bread : "product",
            userName : res.count_info.nik,
            result : result,
            dbdata : dbdata,
            userP : userP,
            query : req.query,
            curUrl : curUrl
        }  
        // console.log(555555555555555)
        res.render("product",data);
    }
    
    module.exports = {_render,_renderPro}
    
    