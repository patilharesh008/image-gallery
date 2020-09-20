const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const router = require('./router');
const app = express()
const port = 3000

app.use("/images", express.static(path.join("./images")));

mongoose.connect("mongodb+srv://Shashin:jGRxV9sHhO0zrgBl@cluster0-vumni.mongodb.net/imageGallery",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log("Connected to Database...");

})
.catch(()=>{
  console.log("connection Fail...");

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    );
    next();
  });

app.use('', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})