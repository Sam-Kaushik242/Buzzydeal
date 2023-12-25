const mongoose = require('mongoose')
const validator = require('validator')
const bcyrptjs = require('bcryptjs')
const jwtToken = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter Your Name"],
        maxLength: [30, "Name can't exceed 30 characters"],
        minLength: [5, "Name should have more than 5 characters"]
    },
    email:{
        type: String,
        required: [true, "please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail, "Please Enter the valid email"]
    },
    password:{
        type: String,
        minLength: [8, "Password should be more than 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password") )
    this.password = await bcyrptjs.hash(this.password, 10);
});


// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwtToken.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compared Password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcyrptjs.compare(enterPassword, this.password)
}


// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async  function () {
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing  and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordToken = Date.now() + 15 * 60*1000
    return resetToken
}

module.exports = mongoose.model("user", userSchema)