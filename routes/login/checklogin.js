const router = require("express").Router();
const mgdb = require("../database/mgdb");
const comconfig = require("../database/comconfig")


router.post("/",(req,res)=>{
    // console.log(req.body);
    mgdb({
        dbName : comconfig.count_dbname,
        collection:comconfig.demo_collection,
    }).then(({col,client})=>{
        col.find({}).toArray((err,result)=>{
                    // console.log(result);
                    let onoff = false;
                    for(let i = 0; i < result.length; i++){
                        if(result[i].user === req.body.user){
                            if(result[i].psd === req.body.psd){
                                onoff = true;
                                console.log("1",onoff)
                                break;
                                // res.redirect("/admin/home.html")
                            }else{
                                onoff = false;
                                console.log("2",onoff)
                            }
                        }else{
                            onoff = false;
                            console.log("3",onoff)
                            // res.redirect("/admin/error.html")
                        }
                    }
                        if(onoff){
                            console.log('正确')
                            // res.send("1");
                            res.send("success");
                            // console.log(req.url);
                        }else{
                            console.log("错误");
                            res.send("error");
                        }
                })
    })
})

module.exports = router;