/**
 * Created by niki on 12/11/15.
 *
 * Types to use:
 String
 Boolean
 Date
 Array
 Number
 ObjectId
 Mixed
 Buffer
 */
var mongoose = require('mongoose');

var periodSchema = new mongoose.Schema({
    start: Number, end: Number
});

var attributeSchema = new mongoose.Schema({
    height: Number,
    width: Number,
    planting_density: Number,
    evergreen: Boolean,
    winter_hardy: Boolean,
    method_multiply: [String],
    period_sow: periodSchema,
    period_plant: periodSchema,
    period_harvest: periodSchema
});
var flowerSchema = new mongoose.Schema({
    has_flower: Boolean,
    color: String,
    description: String,
    edible: Boolean,
    vagrant: Boolean,
    period: periodSchema
});
var fruitSchema = new mongoose.Schema({
    has_fruit: Boolean,
    color: String,
    type: String,
    description: String,
    edible: Boolean,
    period: periodSchema
});
var locationSchema = new mongoose.Schema({
    soil_types: [String],
    lighting_types: [String],
    moisture_types: [String],
    acidity_types: [String],
    habitat: String,
    comments: String
});
var maintenanceDetailSchema = new mongoose.Schema({
    needed: Boolean, instructions: String, periods: [periodSchema]
});
var maintenanceSchema = new mongoose.Schema({
    pruning: maintenanceDetailSchema,
    fertilize: maintenanceDetailSchema,
    chalk: maintenanceDetailSchema
});


var PlantSchema = new mongoose.Schema({
    //Latin name
    name: {type: String, index: true},
    alt_name: String,
    description: String,
    type: String,
    image_url: String,
    attributes: attributeSchema,
    flower: flowerSchema,
    fruit: fruitSchema,
    location: locationSchema,
    maintenance: maintenanceSchema,
    images: [String],
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Plant', PlantSchema);
