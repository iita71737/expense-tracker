const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    category: {
        type: String,
        required: true
    },
    category_en: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    totalAmount: {
      type: Number
    }
})

module.exports = mongoose.model('Record', recordSchema)