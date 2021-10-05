const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const crypto = require('crypto');



dotenv.config()

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validatePhone = function (phone) {
    re = /^[0-9]{10}/
    return re.test(phone)
}
const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        validate: [validateEmail, "Please enter a valid email address"],
        required: [true],
        unique: true,
    },
    phone: {
        type: String,
        validate: [validatePhone, "Please enter a valid phone number"],
        required: [true]
    },
    role: {
        type: String,
        enum: ["admin", "app_user"],
        default: "app_user"
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    hash: String,
    salt: String,
    account_type:{
        type: String,
        enum:["free","paid"],
        default:"free"
    }
}, { timestamps: true })


// UserSchema.methods.setPassword = function (password) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             if (err) throw err
//             password = hash
//             return password
//         })
//     })
// }

// UserSchema.methods.validatePassword = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// UserSchema.methods.generateJWT = function () {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);

//     return jwt.sign({
//         email: this.email,
//         id: this._id,
//         role: this.role,
//         exp: parseInt(expirationDate.getTime() / 1000, 10),
//     }, 'secret'); //process.env.JWTKEY);
// }


UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    console.log(this.email,this._id,this.role)
    if(this.role == "admin"){
        return jwt.sign({
            email: this.email,
            id: this._id,
            role: this.role,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secretadmin')//process.env.ADMIN_JWTKEY);
    }else{
        return jwt.sign({
            email: this.email,
            id: this._id,
            role: this.role,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secretuser')//process.env.USER_JWTKEY);
    }
    
}



UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        role: this.role,
        token: this.generateJWT(),
    };
};




module.exports = mongoose.model('User', UserSchema)
