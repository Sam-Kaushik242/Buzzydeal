const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendEmail = require("../utils/sendEmail")
const User = require("../models/userModels");
const sendToken = require('../utils/jwtToken');
const cloudinary = require('cloudinary')


//Register User
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{

    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "myCloud.public_id",
            url: "myCloud.secure_url",
          },
    });
    sendToken(user, 200, res)
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & password", 400))
    }

    const user = await User.findOne({email, password}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }
    sendToken(user, 200, res)
})

// LogOut User
exports.logout = catchAsyncErrors(async (req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    // Get Password
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is: \n\n${resetPasswordURL}\n\nIf you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `BuzzyDeal Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Message sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        throw new ErrorHandler(error.message, 500);
    }
});


exports.resetPassword = catchAsyncErrors(async (req, res)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if (!user) {
        throw new ErrorHandler("Reset Password Token is not valid or has been expired", 400);
    }

    if (req.body.password !== req.body.confirmPassword) {
        throw new ErrorHandler("Password is not matched", 400);
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()
    sendToken(user, 200, res)
})


// Get the Detail
exports.getUserDetails= catchAsyncErrors(async (req, res, next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

// Update the Password
exports.updatePassword = catchAsyncErrors(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect", 401))
    }
    
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match", 400))
    }

    user.password = req.body.newPassword
    await user.save();

    res.status(200).json({
        success: true,
        user
    })
    sendToken(res, 200, user)
})


// Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // We will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get All Users 
exports.getAllUsers = catchAsyncErrors(async (req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Get Single User Detail (Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// Update User Role
exports.updateUserRole = catchAsyncErrors(async (req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // We will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


// Delete User
exports.deleteUser = catchAsyncErrors(async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with this id: ${req.params.id}`, 401))
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})