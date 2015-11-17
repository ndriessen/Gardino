/**
 * Created by niki on 12/11/15.
 */


var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    //Latin name
    key: {type: String, index: true},
    description: String,
    category: String, //should be 'lifecycle' or 'Maintenance'
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PlantEvent', EventSchema);