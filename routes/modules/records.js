const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
    try{
    const config = {
        title: '新增支出',
        action: '/records'
    }
    let categories = await Category.find().lean()
    //console.log(categories )
    res.render('new', { config, categories })
}catch (e) {
    console.warn(e)
}
})

router.post('/', async (req, res) => {
    try{
    const { name, category_en, date, amount } = req.body
    //缺欄位
    console.log(req.body)
    if (!name || !category_en || !date || !amount  ) {
        //req.flash('warning_msg', '所有欄位皆為必填')
        return res.redirect('/records/new')
    }
    let categories = await Category.find().lean()
    const category_ch = categories.find( item => item.cateName === category_en  ? item.title : "")
    //console.log(category_ch.title)  
    Record.create({
        name:name,
        category:category_ch.title,
        category_en:category_en,
        date:date,
        amount:amount
    }).then(
        () => res.redirect('/')
    ).catch(
        err => console.log(err)
    )
    }catch (e) {
    console.warn(e)
}
})

router.get('/:id', async (req, res) => {
     try{
    const record_id = req.params.id
    const config = {
            title: '新增支出',
            action: `/records/${record_id}?_method=PUT`
    }
    const categories = await Category.find().lean()

     Record.findById(record_id)
    .lean()
    .then(( record ) => res.render('edit', { config, record , categories}))
    .catch(error => console.log(error))
}catch (e) {
    console.warn(e)
}
})

router.put('/:id', async (req, res) => {
    try{
    const record_id = req.params.id
    const { name, category_en, date, amount } = req.body
    
    const categories = await Category.find().lean()
    const category_ch = categories.find( item => item.cateName === category_en  ? item.title : "")

    console.log( category_ch)

    Record.findById(record_id)
        .then(record => {
            record.name = name
            record.category = category_ch.title
            record.category_en = category_ch.cateName
            record.date = date
            record.amount = amount
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
}
catch (e) {
    console.warn(e)
}
})

router.delete('/:id', async(req, res) => {
    try{
  const record_id = req.params.id
  Record.findById(record_id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
    }
    catch (e) {
    console.warn(e)
    }
})

module.exports = router