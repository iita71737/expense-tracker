// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main',  extname:'.hbs' }))
app.set('view engine', 'hbs')

// routes setting
app.get("/", (req, res) => {
   res.render('index')
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
