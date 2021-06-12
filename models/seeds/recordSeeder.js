const mongoose = require('mongoose')
const Record = require('../record') // 載入 todo model
const Category = require('../category')

const db = require('../../config/mongoose')

const records = require('../../records.json')

db.once('open', async () => {
    try {
        records.results.forEach(record => {

            Record.create({
                name: record.name,
                category: record.category,
                category_en: record.category_en,
                date: record.date,
                amount: record.amount
            }).then(() => {
                console.log('record seeder insert done')
                console.log('database connection close')
                process.exit()
            })
        })
        
    } catch (e) {
        console.warn(e)
    } 
})