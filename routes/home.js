const router = require("express").Router();
// const silder = require("./silder")

router.get("/",(req,res)=>{
    // console.log(res.count_info)
    let data = {
        active:"home",
        icon : res.count_info.icon,
        bread : "home",
        userName : res.count_info.nik
    }


    res.render("home",data);
    
})


module.exports = router;