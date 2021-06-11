// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const routes = require('./routes')

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
app.use(express.static('public'))

app.use(routes)
// routes setting
app.get("/new", (req, res) => {
   res.render('new')
});

app.get("/edit", (req, res) => {
   res.render('edit')
});



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
