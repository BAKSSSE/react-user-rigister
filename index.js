const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const app = express()
const port = 5000
mongoose.connect('mongodb+srv://bakssse:'+process.env.MONGOOSE_PASSWORD+'@boilerplate.cm1ktua.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected Ok'))
  .catch(err => console.log(err))

// 1

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})