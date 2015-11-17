/**
 * Created by niki on 12/11/15.
 */


var mongoose = require('mongoose');

var AttributeSchema = new mongoose.Schema({
    //Latin name
    key: {type: String, index: true},
    description: String,
    category: String,
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PlantAttribute', AttributeSchema);

//Hardcoded for now
var Attributes = [
    {
        key: 'width',
        description: 'Width (in cm)',
        names: [
            {lang: 'nl', value: 'Breedte'}
        ],
        descriptions: [
            {lang: 'nl', value: 'Breedte (in cm)'}
        ]
    },
    {
        key: 'height',
        names: [
            {lang: 'nl', value: 'Hoogte'}
        ],
        description: [
            {lang: 'nl', value: 'Hoogte (in cm)'}
        ]
    },
    {
        key: 'evergreen',
        names: [
            {lang: 'nl', value: 'Groenblijvend'}
        ],
        description: [
            {lang: 'nl', value: 'Groenblijvend of verliest de plant bladeren'}
        ]
    }
];