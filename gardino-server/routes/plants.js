var express = require('express');
var router = express.Router();

var Plant = require('../models/plant.js');

/* GET /plants listing. */
router.get('/', function (req, res, next) {
    Plant.find(function (err, plants) {
        if (err) return next(err);
        res.json(plants);
    });
});

/* POST /plants */
router.post('/', function (req, res, next) {
    Plant.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /plants/id */
router.get('/:id', function (req, res, next) {
    Plant.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /plants/:id */
router.put('/:id', function (req, res, next) {
    Plant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /plants/:id */
router.delete('/:id', function (req, res, next) {
    Plant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
