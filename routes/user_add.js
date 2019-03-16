const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const mgdb = require("./database/mgdb");
const comconfig = require("./database/comconfig")

let id = 0;
let p = 0;
let doc = ''
router.get("/",(req,res)=>{
    id = req.query.id ? req.query.id : '';
    p = req.query.p ? req.query.p : 0;
    doc = req.query.doc ? req.query.doc : '';
    let dbdata = {};
    if(req.query.doc == "chan"){
        mgdb({
            dbName : comconfig.count_dbname,
            collection : comconfig.count_collection
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
            active:"user",
            icon : res.count_info.icon,
            bread : "user",
            userName : res.count_info.nik,
            dbdata : dbdata
        }
        res.render("user_add",data);
    }
})

router.post("/userSub",(req,res,next)=>{
//-------------无论修改还是添加都要进行的一些共有过程----------------------------------
        // console.log(req.files);//path:
        // 'F:\\a千峰学院\\第三阶段课程\\nodeServer\\nodeProject\\public\\upload\\user\\a6e2d65c7b9fd58f0ac5459f34078600',
        // console.log(req.body);

        //---------------解析数据---------------------------------------
        let {user,psd,nik,follow,fans,collection,time} = req.body;
        // console.log(req.body)
        // console.log(req.files)
        //-------------------重命名--------------------------------------

        let icon = req.files.length > 0 ? req.files[0].path + path.parse(req.files[0].originalname).ext : '';
        if(!icon){
            icon = '/user/noimage.png'
        }else{
            icon = '/user/' + req.files[0].filename + path.parse(req.files[0].originalname).ext;
            fs.rename(req.files[0].path,req.files[0].path + path.parse(req.files[0].originalname).ext,(err)=>{})
        }
        // console.log(icon)

console.log(doc!=="chan")
   //-----------------判断是修改还是添加---------------------------
    if(doc !== "chan"){
        //---------------------写入数据库---------------------------------------
        // console.log(1111111111111111111111)
        mgdb({
                dbName : comconfig.count_dbname,
                collection : comconfig.count_collection
            }).then(({col,client,ObjectId})=>{
                col.insertMany([
                    {user,psd,nik,follow,fans,time,icon}
                ],(err,result)=>{})
                col.find({}).toArray((err,arr)=>{
                    const io = require("../bin/www");
                    io.emit("update",{data:arr[arr.length - 1]})
                    // console.log(arr)
                })

            })
            res.send("1");

    }else{
        // console.log(22222222222222222)
        mgdb({
            dbName : comconfig.count_dbname,
            collection : comconfig.count_collection
        }).then(({col,client,ObjectId})=>{
            col.updateOne({_id:ObjectId(id)},{$set:{user,psd,nik,follow,fans,time,icon}},function(err,result){})
        })
        res.send({'page' : p});


    }
    // res.end()
     // res.send({'page' : p});
    
})




module.exports = router;