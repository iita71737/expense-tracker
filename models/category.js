const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
      type: String,
      required: true
    },
    cateName: {
        type: String,
        required: true
    },
    cateIcon: {
        type: String,
        required: true
    },
    cateIcon3x: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Category', categorySchema)