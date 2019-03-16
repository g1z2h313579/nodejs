const router = require("express").Router();
const mgdb = require("../database/mgdb");
const comconfig = require("../database/comconfig")

router.get("/",(req,res)=>{
// console.log(req.query)

    if(req.query.data == "stormdata"){
        mgdb({
            dbName : comconfig.demo_dbname,
            collection : comconfig.demo_dbname
        }).then(({col,client,ObjectId})=>{
            col.find({}).toArray((err,result)=>{
                res.send(result);
                client.close();
            })
        })
    }else if(req.query.data == "user"){
        mgdb({
            dbName : comconfig.count_dbname,
            collection : comconfig.count_collection
        }).then(({col,client,ObjectId})=>{
            col.find({}).toArray((err,result)=>{
                res.send(result);
                client.close();
            })
        })
    }
})

module.exports = router