const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');
const imageModal = require("./image-modal");
const router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error =new Error("Invalid Mime Type");
    if(isValid){
      error = null;
    }
    cb(error,"./images");
  },
  filename: (req, file, cb) =>{
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext =  MIME_TYPE_MAP[file.mimetype];
    cb(null,name + "-" + Date.now() + "." + ext);
  }
});


router.post('/addImg',multer({storage: storage}).single("image"),(req,res,next) =>{

    const url = req.protocol + "://" + req.get("host");
    const emp = new imageModal();
   
      emp.image = url + "/images/" + req.file.filename;
  
      emp.save().then(data=>{
        res.status(201).json({result: data});

      });
  });
  router.get('/show', (req,res,next) => {
    imageModal.find().then((data) =>{
        res.send(data);
      });
  });
  
  module.exports = router;  

