const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.end();
})

app.use(express.static("./dist"));


app.listen(3000)