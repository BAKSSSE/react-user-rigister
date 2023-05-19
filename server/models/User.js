const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String 
    },
    tokenExp: {
        type: Number
    }
})
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                console.log(hash);
                if(err) return next(err)
                user.password = hash
                console.log(5);
                next();
            })
        })
    } else {
        next();
    }
    
})
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

UserSchema.methods.generateToken = async function(cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET_TOKEN)

    user.token = token 
//
    await user.save(user).then(function() {
        return cb(null, user)
    }).catch(function(err) {
        return cb(err)
    })

}
UserSchema.statics.findByToken = async function(token, cb) {
    var user = this;

    var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

    await user.findOne({"_id": decoded, "token": token}).then((user) => {
        cb(null, user)
    }).catch((err) => {
        return cb(err)
    })
}

const User = mongoose.model('User', UserSchema);
module.exports = { User }