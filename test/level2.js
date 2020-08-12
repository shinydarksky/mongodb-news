const mongoose = require('mongoose')
const Schema = mongoose.Schema
const level2Chema = new Schema({
    name:String,
    parent:Schema.Types.ObjectId
})
module.exports = mongoose.model('level',level2Chema)