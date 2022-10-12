const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3001;

app.get('/home', (req, res) => {
  res.send('Hello World course example!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})