const Record = require('../record') // 載入 todo model
const db = require('../../config/mongoose')
const { results } = require('../../records.json')

db.once('open', async () => {
    try {
            Record.create(results)
                .then(() => {
                console.log('record seeder insert done')
                console.log('database connection close')
                process.exit()
            })
        
    } catch (e) {
        console.warn(e)
    } 
})