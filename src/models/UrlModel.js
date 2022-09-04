const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    code:{type:String, required:true},
    url:{type:String, required:true},
    click:{type:Number, default:0}
})

module.exports = mongoose.model('url', urlSchema)