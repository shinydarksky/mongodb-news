const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name:String,
    kids:[{type:Schema.Types.ObjectId}],
    ordering:Number,
    active:Boolean
})

module.exports = mongoose.model('category',categorySchema)