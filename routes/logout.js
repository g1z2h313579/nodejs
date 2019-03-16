module.exports = (req,res)=>{
    req.session = null;
    res.redirect("/admin/login.html")
}