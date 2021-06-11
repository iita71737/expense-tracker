// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const routes = require('./routes')
// require express-handlebars here
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers')
H.registerHelpers(Handlebars)
const flash = require('connect-flash')
const methodOverride = require('method-override')

const Record = require('./models/record')
const Category =  require('./models/category')

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

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main',  extname:'.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
app.use(flash())

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
