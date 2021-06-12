const Category = require('../category') // 載入 todo model
const db = require('../../config/mongoose')
const categories = require('../../records.json')


db.once('open',  async() => {
    try {   
        categories.category.forEach( category => {
            Category.create({
                title:category.title,
                cateName :  category.cateName,
                cateIcon : category.cateIcon,
                cateIcon3x : category.cateIcon3x
            }).then(() => {
                console.log('cateseeder insert done')
                console.log('database connection close')
                process.exit()       
            })
        })
    }
    catch (e) {
    console.warn(e)
    }
})
