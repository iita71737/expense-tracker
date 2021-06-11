// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const Category = require('../../models/category')

// 定義首頁路由
router.get("/", async (req, res) => {

try{
    let records = await Record.aggregate([
        {
                $project: {
                    name: 1,
                    category_en: 1,
                    date: 1,
                    amount: 1,
                }
        }
    ])  
    let categories = await Category.find().lean()

    records.forEach( record => {
            //iconFilter get icon by compare to category
            record.iconName  = categories.find( item => item.cateName === record.category_en ? item.cateIcon3x : "" )
        })
    
    //計算總金額
    let totalAmount = records.reduce((prev, record) => prev += record.amount, 0)

    res.render('index', { 
        records,
        categories,
        totalAmount
    })
}
catch (e) {
    console.warn(e)
}
});

router.get('/search', (req, res) => {
    const keyWord = req.query
    console.log(keyword)
    Record.find( {category_en :new RegExp(keyWord, 'i')})
    .lean()
    .then( record => res.render('index', { record , keyWord} ))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router