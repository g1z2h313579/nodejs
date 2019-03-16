module.exports = (req,res,next)=>{
    // console.log(req.session);
    // console.dir(req.session.icon);
    // console.log(req.cookies.count_info);
    // console.log(req.session.userName == req.cookies.count_info)
    // console.log(!req.session.userName)
    if(!req.session.userName){
        res.redirect("/admin/login.html")
    }
    res.count_info = {user:req.session.userName,icon:req.session.icon,nik:req.session.nik,follow:req.session.follow,fans:req.session.fans,time:req.session.time}
    next()
}