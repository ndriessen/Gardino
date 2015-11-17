var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

//MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gardino', function (err) {
    if (err) {
        console.log('connection error to mongodb', err);
    } else {
        console.log('connection successful to mongodb');
    }
});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/app')));
app.use('/data', express.static(path.join(__dirname, 'public/data')));

app.get('/', function (req, resp, next) {
    resp.redirect('/index.html');
});

var GardinoConfig = {
    ImageUploadPath: path.join(__dirname, 'public/data/images/'),
    ImageBaseUrl: '/data/images/'
};

var multer = require('multer');
var upload = multer({
    dest: GardinoConfig.ImageUploadPath,
    limits: {
        fileSize: 3145728
    },
    fileFilter: function (req, file, cb) {
        var result = file.mimetype.indexOf('image/') == 0;
        console.log('Checking file filter on mimetype %s : %s', file.mimetype, result);
        cb(null, result);
    }
});
app.post('/upload', upload.single("file"), function (req, res, next) {
    console.log('Received: %j', req.file);
    var file = req.file;
    var targetFile = path.join(file.destination, file.filename + path.extname(file.originalname));
    console.log('Saving to ' + targetFile);
    fs.renameSync(file.path, targetFile);
    var response = {
        url: GardinoConfig.ImageBaseUrl + file.filename + path.extname(file.originalname)
    };
    console.log('Sending response: %j', response);
    res.status(200).json(response);
});

/*var multipart = require('connect-multiparty');
 var multipartMiddleware = multipart();

 app.post('/upload', multipartMiddleware, function (req, res) {
 try {

 console.log('Starting upload to %s', GardinoConfig.ImageUploadPath);
 // We are able to access req.files.file thanks to
 // the multiparty middleware
 //
 if (req && req.files && req.files.file && req.files.file.length > 0) {
 console.log('Detected %s files: \n%j', req.files.file.length, req.files.file);
 var respImgData = [];
 var files = req.files.file;
 console.log((typeof files));
 if(typeof files != Array) {
 console.log('not an array');
 console.log(files['fieldName']);
 files = [files];
 }
 for (var i = 0; i++; i < files.length) {
 console.log('b');
 console('i=' + i);
 var file = files.file[i];
 console.log('Uploading file: %j', file);
 var img = {
 originalName: file.originalFilename,
 tmp: file.path,
 contentType: file.type,
 target: path.join(GardinoConfig.ImageUploadPath, file.originalFilename),
 url: GardinoConfig.ImageBaseUrl + file.originalFilename
 };
 console.log('Prepared img data: %j', img);
 respImgData.push(img);
 }
 console.log('Sending response: %j', respImgData);
 res.json(respImgData);
 } else {
 res.status(500).json({'message': 'Invalid request'});
 }
 } catch(e) {
 res.status(500).json({'message': 'Error Uploading', error: e});
 console.log('Error uploading', e);
 }
 });
 */

var plant_api_routes = require('./routes/plants');
app.use('/api/plants', plant_api_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
        console.log('Error: %s\n%j', err.message, err);
    });

}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
    /*res.render('error', {
     message: err.message,
     error: {}
     });*/
    console.log('Error: %s\n%j', err.message, err);
});

module.exports = app;
