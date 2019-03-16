const router = require("express").Router();
const mgdb = require("./database/mgdb");
const comconfig = require("./database/comconfig");
const {_renderPro} = require("./database/render");
const {finddata_Pro} = require("./database/finddata")

router.get("/",(req,res)=>{

    req.query.doc = req.query.doc ? req.query.doc : '';


    let proP = {...comconfig};


        mgdb({
            dbName : comconfig.pro_dbname,
            collection : comconfig.pro_collection
        }).then(({col,client,ObjectId})=>{
    //--------------------查找数据库渲染-----------------------------------   
    //--------------初始化渲染//判断req.query对象是否只有p，为翻页渲染做准备---------------
    console.log(req.query.doc)
    if(!req.query.doc && !req.query.search && !req.query.show){   
        // console.log(2222222222222)
            //---------------渲染----------------------------
            finddata_Pro(col,client,req,res);
            //--------------------删除数据-------------------------------------------------
        }else if(req.query.doc == "del"){
                col.deleteOne({_id:ObjectId(req.query.id)},(err,result)=>{
                    // console.log(111111111111111111)
                    finddata_Pro(col,client,req,res);
                })
                // console.log(ObjectId)
        }
    })



    //------------------------------------建立搜索功能---------------------------------------
    if(req.query.search){
        mgdb({
            dbName : comconfig.pro_dbname,
            collection : comconfig.pro_collection
        }).then(({col,client,ObjectId})=>{
            col.find({title : eval('/'+ req.query.search +'/g')}).toArray((err,result)=>{
                // console.log(result)
                _renderPro(result,proP,req,res)
            })
        })
    }

    //-------------------显示全部功能--------------------------------------
    if(req.query.show == "all"){
        // userP.page_count = 9999;
        // console.log(userP)
        mgdb({
            dbName : comconfig.pro_dbname,
            collection : comconfig.pro_collection
        }).then(({col,client})=>{
            // console.log(6666666666666666)
            finddata_Pro(col,client,req,res)
        })
    }



    // let data = {
    //     active:"product",
    //     icon : res.count_info.icon,
    //     bread : "product",
    //     userName : res.count_info.nik,
        
    // }
    // res.render("product",data);
})


module.exports = router;