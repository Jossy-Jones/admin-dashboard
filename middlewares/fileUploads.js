/*
* File Uploads
*
*/

// Dependecies
const express = require("express")
const app = express();
const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (file, cb) => {
    // if (file.mimetype.startsWith("image")) {
    //     cb(null, true);
    // } else {
    //     cb("Please upload only images.", false);
    // }
};

const uploadConfig = multer({
    storage: multerStorage
});



const Uploads = {}

Uploads.multiple = uploadConfig.array("images", 5); // Limit to 5 images

Uploads.single = uploadConfig.single("image");

Uploads.images = async (req,res) => {
    // if (!files) return next();
    Uploads.uploadSingle(req,res,err=>{
        
        return res.json({message: req.file, status: 200});
    })
    // upload(req, res, function(err) {
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any
    //     console.log(req.file)

    //     if (req.fileValidationError) {
    //         return res.send(req.fileValidationError);
    //     }
    //     else if (!req.file) {
    //         return res.send('Please select an image to upload');
    //     }
    //     else if (err instanceof multer.MulterError) {
    //         return res.send(err);
    //     }
    //     else if (err) {
    //         return res.send(err);
    //     }
    // })
}

module.exports = Uploads;