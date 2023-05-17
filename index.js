const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})) 
// application/json
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://bakssse:' + process.env.MONGOOSE_PASSWORD + '@boilerplate.cm1ktua.mongodb.net/?retryWrites=true&w=majority', {
    // 6 이하
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected Ok'))
  .catch(err => console.log(err))

// 1

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/register', async (req, res) => {
    const user = new User(req.body)
    await user.save().then( () => {
            return res.status(200).json({
                success: true
            })
        
    } ).catch( (err) => {
            return res.json({ success: false, err })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})