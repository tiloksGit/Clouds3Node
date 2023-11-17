const s3 = require('../aws/s3');

const upload = async(req, res) => {
    const file = req.file;
    var filename, type;
    if(file.originalname){
     filename = file.originalname;
        type = file.mimetype;
    }
    
    var i = filename.lastIndexOf('.');
    const ext = (i < 0) ? '' : filename.substr(i);
    
    console.log(ext)
    try{
      const url = await s3.uploadObjectUrl(`${Date.now()}${ext}`, `${type}`)
    //   console.log(url)
      res.status(200).send(url)
    }
    catch{
        res.send("server Error");
    }
}

const getImages = async(req, res) => {
    const data = await s3.listObjectUrl();
    if(data){
        res.status(200).send(data);
    }else{
        res.status(400).send({message: "something went wrong"})
    }
}

const viewImage = async(req, res) => {
    const {key} = req.body;

    const url = await s3.getObjectUrl(key);
    if(url){
        res.status(200).send(url)
    }
    else{
        res.status(404).send({message:"something went wrong"})
    }
}
 
module.exports = {upload, getImages, viewImage}