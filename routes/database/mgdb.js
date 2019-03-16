const mongodbClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;
const comconfig = require("./comconfig")

const mgdb = function({dbName,collection,url = comconfig.db_url}){
    
    return new Promise((resolve,reject)=>{

        mongodbClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
            if(err){
                console.log(err)
            }else{
                const db = client.db(dbName);
                const col = db.collection(collection);
                // console.dir(ObjectId)
                resolve({col,client,ObjectId});
            }
        })

    })
}



module.exports = mgdb;