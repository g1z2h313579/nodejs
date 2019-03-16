module.exports = {
    page_count : 3,
    page_start : 0,
    pro_dbname : "production",
    pro_collection : "production",
    count_dbname : "countlist",
    count_collection : "user_info",
    demo_dbname : "stormdata",
    demo_collection : "stormdata",
    db_url : "mongodb://localhost:27017",

    local : {
        open : true,
        port : "3000"
    },
    http : {
        open : false,
        port : "80"
    },
    https : {
        open : false,
        port : "443"
    }
}