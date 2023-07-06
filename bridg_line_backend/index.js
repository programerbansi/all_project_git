
require('dotenv').config()
require("./db/conn")
var cors = require("cors");
const router = require("./route/route");
const express = require("express")

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE, PATCH")
    next();
}); 
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        // abortOnLimit: true,
    })
);
app.use(router);   
app.use(express.static("./public"));
app.all('*', (req, res) => {
    res.status(200).send("URL not found")
})

app.listen(8000,function(err,res){
    if(err)
    {
        console.log("Not connected")
    }
    else
    {
        console.log("Connected")
    }
})



   
