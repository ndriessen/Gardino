var express = require('express');
var path = require('path');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/upload', multipartMiddleware, function (req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var uploadPath = global.GARDINO_PLANT_IMG_UPLOAD_DIR;
    var file = req.files.file;
    var respImgData = [];
    req.files.forEach(function (file) {
        console.log('Uploading file: %j', file);
        var img = {
            originalName: file.originalFilename,
            tmp: file.path,
            contentType: file.type,
            target: path.join(uploadPath, file.originalFilename),
            url: global.GARDINO_PLANT_IMG_URL + file.originalFilename
        };
        console.log('Prepared img data: %j', img);
        respImgData.push(img);
    });
    res.json(respImgData);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/index.html');
});

module.exports = router;
