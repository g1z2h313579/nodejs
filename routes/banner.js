const router = require("express").Router();

router.get("/",(req,res)=>{
    let data = {
        active:"banner",
        icon : res.count_info.icon,
        bread : "banner",
        userName : res.count_info.nik
    }
    res.render("banner",data);
})


module.exports = router;