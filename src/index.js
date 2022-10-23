
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// Static file
// app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'))

// Middleware
// app.get('/middleware', 
//   function(req, res, next) {
//     if(['vethuong', 'vevip'].includes(req.query.ve)) {
//       req.face = 'Dán logo or ticker...!'
//       return next();
//     }
//     res.status(403).json({Message: 'Access denied...!'})
//   },
//   function(req, res, next) {
//     res.json({
//       middleware: 'Successfully...!',
//       face: req.face
      
//     })
//   }
// );


// Template engine
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'));
app.use(methodOverride('_method'));

// Static files
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})