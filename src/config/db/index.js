const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/blogs_education_dev');
    console.log('Connect successfully...!')
  } catch (error) {
    console.log('Connect failure...!')
  }

}

module.exports = { connect };