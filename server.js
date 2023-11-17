const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOptions = require("./config/corsOptions")


app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());

app.use("/*", (req,res,next)=>{
    console.log(req.url);
    next();
})

app.get("/",(req,res) => {
    res.send("ok done")
})

app.use("/s3", require('./Routes/rootRoute'));

app.listen("3000",()=>{
    console.log("server running on port 3000");
})