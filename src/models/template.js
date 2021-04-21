const mongoose = require('mongoose')
const Schema = mongoose.Schema

const template = new Schema({
    templateName:{
        type:String,
        required:true
    },
    stages:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('TEMPLATE' , template)