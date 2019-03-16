const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const mgdb = require("./database/mgdb");
const comconfig = require("./database/comconfig");



let id = '';
let p = 0;
let doc = ''

router.get("/",(req,res)=>{
    id = req.query.id ? req.query.id : '';
    p = req.query.p ? req.query.p : 0;
    doc = req.query.doc ? req.query.doc : '';


    let dbdata = {};
    if(req.query.doc == "chan"){
        mgdb({
            dbName : comconfig.pro_dbname,
            collection : comconfig.pro_collection
        }).then(({col,client,ObjectId})=>{
            col.find({_id:ObjectId(req.query.id)}).toArray((err,result)=>{
                // console.log(result);
                dbdata = {...result[0]}
                // console.log(dbdata)

                _render(dbdata)

            })
        })
    }else{
        _render()
    }


    function _render(dbdata = ''){
        let data = {
            active:"product",
            icon : res.count_info.icon,
            bread : "product",
            userName : res.count_info.nik,
            dbdata : dbdata
        }
        res.render("product_add",data);
    }


    // let data = {
    //     active:"product",
    //     icon : res.count_info.icon,
    //     bread : "product",
    //     userName : res.count_info.nik
    // }
    // res.render("product_add",data);
})



router.post("/proSub",(req,res)=>{
   
    // console.log("触发了post")
    // console.log(req.body)
    // console.log(req.files)
    let {content,title,dec,auth,collection} = req.body;
    //-------------------重命名--------------------------------------

    let icon = req.files.length > 0 ? req.files[0].path + path.parse(req.files[0].originalname).ext : '';
    if(!icon){
        icon = '/user/noimage.png'
    }else{
        icon = '/production/' + req.files[0].filename + path.parse(req.files[0].originalname).ext;
        fs.rename(req.files[0].path,req.files[0].path + path.parse(req.files[0].originalname).ext,(err)=>{})
    }




    if(doc !== "chan"){
        //---------------------写入数据库---------------------------------------
        console.log(1111111111111111111111)
        mgdb({
                dbName : comconfig.pro_dbname,
                collection : comconfig.pro_collection
            }).then(({col,client,ObjectId})=>{
                col.insertMany([
                    {content,title,dec,auth,icon}
                ],(err,result)=>{})
            })
            res.send("1");

    }else if(doc == "chan"){
        console.log("product_add改变数据")
        // console.log(id)
        mgdb({
            dbName : comconfig.pro_dbname,
            collection : comconfig.pro_collection
        }).then(({col,client,ObjectId})=>{
            col.updateOne({_id:ObjectId(id)},{$set:{content,title,dec,auth,icon}},function(err,result){
                // console.log("err:",err,"result:",result)
            })
        })
        res.send({'page' : p});
    }








})



module.exports = router;