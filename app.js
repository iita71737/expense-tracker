// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/expense-record', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const Record = require('./models/record')
const Category =  require('./models/category')

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main',  extname:'.hbs' }))
app.set('view engine', 'hbs')

// routes setting
app.get("/", async (req, res) => {

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
    //console.log( records )

    res.render('index', { records, categories } )
    }
    catch (e) {
        console.warn(e)
    }
});

app.get("/new", (req, res) => {
   res.render('new')
});

app.get("/edit", (req, res) => {
   res.render('edit')
});

app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
