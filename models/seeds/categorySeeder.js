const Category = require('../category') // 載入 todo model
const db = require('../../config/mongoose')
const { category } = require('../../records.json')


db.once('open',  async() => {
    try {   
            Category.create(category)
                .then(() => {
                console.log('cateseeder insert done')
                console.log('database connection close')
                process.exit()       
        })
    }
    catch (e) {
    console.warn(e)
    }
})
