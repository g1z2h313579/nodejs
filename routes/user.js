const router = require("express").Router();
const mgdb = require("./database/mgdb");
const comconfig = require("./database/comconfig");
const {_render} = require("./database/render");
const {finddata} = require("./database/finddata")


router.get("/",(req,res)=>{
    //------------------为分页器的上下页做准备-----------------------------------
    console.log("user页面",req.query.doc)


    //----------------查库----------------------------
//系统配置本地化
    let userP = {...comconfig};
    // console.log(userP);//{ page_count: 2, page_start: 0 }
    // console.log(typeof userP.page_start);//number
    let dbdata = [];
   
    mgdb({
            dbName : comconfig.count_dbname,
            collection : comconfig.count_collection
        }).then(({col,client,ObjectId})=>{
      //--------------------查找数据库渲染-----------------------------------   
//--------------初始化渲染//判断req.query对象是否只有p，为翻页渲染做准备---------------
      if(!req.query.doc && !req.query.search && !req.query.show){   
        // console.log(098765432)
        //---------------渲染----------------------------
          finddata(col,client,req,res);
        //--------------------删除数据-------------------------------------------------
      }else if(req.query.doc == "del"){
            col.deleteOne({_id:ObjectId(req.query.id)},(err,result)=>{
                finddata(col,client,req,res);
            })
            // console.log(ObjectId)
      }
    })




//------------------------------------建立搜索功能---------------------------------------
if(req.query.search){
    mgdb({
        dbName : comconfig.count_dbname,
        collection : comconfig.count_collection
    }).then(({col,client,ObjectId})=>{
        col.find({nik : eval('/'+ req.query.search +'/g')}).toArray((err,result)=>{
            // console.log(result)
            _render(result,userP,req,res)
            
        })
    })
}

//-------------------显示全部功能--------------------------------------
if(req.query.show == "all"){
    // userP.page_count = 9999;
    // console.log(userP)
    mgdb({
        dbName : comconfig.count_dbname,
        collection : comconfig.count_collection
    }).then(({col,client})=>{
        finddata(col,client,req,res)
    })


}




//     //--------------渲染页面------------------------------
// function _render(result,userP){
//     // console.log(req.query)
//     if(!req.query.p){
//         dbdata = result.slice(comconfig.page_start * userP.page_count,comconfig.page_start * userP.page_count + userP.page_count)
//     }else{
//         //利用url传值确定页数
//         userP.page_start = req.query.p;
//         dbdata = result.slice(userP.page_start * userP.page_count,userP.page_start * userP.page_count + userP.page_count)
//     }
//     // console.log(req.query.search)
//     let data = {
//         active:"user",
//         icon : res.count_info.icon,
//         bread : "user",
//         userName : res.count_info.nik,
//         result : result,
//         dbdata : dbdata,
//         userP : userP,
//         query : req.query,
//         curUrl : curUrl
//     }  
//     res.render("user",data);
// }



// //---------------删除或修改时渲染数据---------------------------------------
//     function finddata(col,client){
//         col.find({}).toArray((err,result)=>{
//             //初始化配置
//             // console.log("22",userP)
//             _render(result,userP)
//             // console.log(result)
//             client.close()
//         })
//       }
})



module.exports = router;