const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})) 
// application/json
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongoURL, {
    // 6 이하
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected Ok'))
  .catch(err => console.log(err))

// 1

app.get('/', (req, res) => {
  res.send('Hello World!!')
})


app.post('/register', async (req, res) => {
    const user = new User(req.body)
    await user.save().then(() => {
            return res.status(200).json({
                success: true
            })
    }).catch( (err) => {
            return res.json({ success: false, err })
    })
})

app.post('/login', async (req, res) => {
  // const User = new User(req.body)
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
      return res.json({
        success: false,
        message: "해당하는 아이디가 존재 하지 않습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({ success: false, message: '비밀번호가 틀렸습니다.'})

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
        .status(200)
        .json({ success: true, userId: user._id })

      })
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})