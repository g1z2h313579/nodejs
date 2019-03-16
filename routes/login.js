const router = require("express").Router();
const mgdb = require("./database/mgdb");
const comconfig = require("./database/comconfig")

router.get("/",(req,res)=>{
    // console.log(req.url);
    res.render("login",{});
})
//-----------------前端思维验证登录（没有兜库过程）----------------------------
// router.post("/",(req,res)=>{
//     // console.log(req.body);
//     mgdb({
//         dbName:"countlist",
//         collection:"user_info",
//     }).then((data,client)=>{
//         data.find({}).toArray((err,result)=>{
//                     // console.log(result);
//                     let onoff = false;
//                     for(let i = 0; i < result.length; i++){
//                         if(result[i].user === req.body.user){
//                             if(result[i].psd === req.body.psd){
//                                 onoff = true;
//                                 console.log("1",onoff)
//                                 break;
//                                 // res.redirect("/admin/home.html")
//                             }else{
//                                 onoff = false;
//                                 console.log("2",onoff)
//                             }
//                         }else{
//                             onoff = false;
//                             console.log("3",onoff)
//                             // res.redirect("/admin/error.html")
//                         }
//                     }
//                         if(onoff){
//                             console.log('正确')
//                             // res.send("1");
//                             res.send("success");
//                             // console.log(req.url);
//                         }else{
//                             console.log("错误");
//                             res.send("error");
//                         }
//                 })
//     })
// })

//----------------通过兜库验证-----------------------------

router.post("/",(req,res)=>{
    // let {user,psd} = req.body;
    // console.log(req.body)
    mgdb({
        dbName : comconfig.count_dbname,
        collection : comconfig.count_collection
    }).then(({col,client})=>{
        col.find({
            user : req.body.user,
            psd : req.body.psd
        },{
            projection:{_id:0}
        }).toArray((err,result)=>{
            // console.log(result)
            if(!err && result.length > 0){
                req.session.userName = result[0].user;
                req.session.passWord = result[0].psd;
                req.session.icon = result[0].icon;
                req.session.nik = result[0].nik;
                req.session.follow = result[0].follow;
                req.session.fans = result[0].fans;
                req.session.time = result[0].time
                // console.log(11111111)

                res.send("success")
            }else{
                res.send("error")
            }
        })
    })



})





module.exports = router;