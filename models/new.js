const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
    title:String,
    description:String,
    image:String,
    content:String,
    ordering:Number,
    active:Boolean
})

module.exports = mongoose.model('new',newSchema)