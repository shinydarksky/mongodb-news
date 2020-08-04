const mongoose = require('mongoose')
const Schema = mongoose.Schema
const level1Shema = new Schema({
    name:String,
    kids:[{type:Schema.Types.ObjectId}]
})

module.exports = mongoose.model('level1',level1Shema)