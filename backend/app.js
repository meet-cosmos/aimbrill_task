const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8010;
const url = `mongodb+srv://admin:admin@cluster0.ymxcgwr.mongodb.net/?retryWrites=true&w=majority`
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

app.use(express.json())
app.use(cors());

mongoose.connect(url).then((success)=>{
    console.log("connected successfully");
}).catch((e)=>{
    console.log("connection unsuccessfull");
})

app.use(authRoute);
app.use(productRoute)

app.listen(PORT, ()=>{console.log(`app listening at ${PORT}`);})