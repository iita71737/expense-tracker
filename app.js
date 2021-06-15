// require packages used in the project
const express = require("express");
const app = express();
const PORT =  process.env.PORT ||  3000; // 如果在 Heroku 環境則使用 process.env.PORT
const routes = require('./routes')
// require express-handlebars here
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars');
const justhbs = require('just-handlebars-helpers')
justhbs.registerHelpers(Handlebars)
const flash = require('connect-flash')
const methodOverride = require('method-override')

require('./config/mongoose')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main',  extname:'.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
app.use(flash())

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`);
});
