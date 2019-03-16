const {_render,_renderPro} = require("./render");
const comconfig = require("./comconfig");

            
//---------------删除或修改时渲染数据---------------------------------------
let userP = {...comconfig};
function finddata(col,client,req,res){
    col.find({}).toArray((err,result)=>{
        //初始化配置

        if(req.query.show == "all"){
            userP.page_count = 9999;
          
            _render(result,userP,req,res)
            
        }else{
            userP.page_count = comconfig.page_count 
           


            _render(result,userP,req,res)
        }

        
        // console.log(result)
        client.close()
    })
  }

  function finddata_Pro(col,client,req,res){
    col.find({}).toArray((err,result)=>{
        //初始化配置
        // console.log(111111111111111,result)
        if(req.query.show == "all"){
            userP.page_count = 9999;
            _renderPro(result,userP,req,res)
        }else{
            // console.log(11111111111111111,userP)
            userP.page_count = comconfig.page_count 
            _renderPro(result,userP,req,res)
        }

        
        // console.log(result)
        client.close()
    })
  }

  module.exports = {finddata,finddata_Pro}