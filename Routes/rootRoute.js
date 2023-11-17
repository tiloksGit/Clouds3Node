const express = require('express');
const router = express.Router();
const Controller = require('../Controller/s3Controller');
const fs = require('fs');
const fsPromises = require("fs").promises;
const path = require('path');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Set your desired upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.post("/upload",upload.single('file'), Controller.upload);
router.get("/get", Controller.getImages);
router.post("/show", Controller.viewImage)

module.exports = router;