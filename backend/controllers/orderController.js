const Order = require("../models/orderModels")
const Product = require("../models/productModels")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

exports.newOrder = catchAsyncErrors(async (req, res)=>{
    const {shippingInfo, orderItems, paymentInfo, itemPrice, shippingPrice, taxPrice, totalPrice} = req.body

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice,
        paidAt: Date.now,
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    })
})

//get Single Order 
exports.getSingleOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get LoggedIn Order
exports.getMyOrder = catchAsyncErrors(async (req, res, next)=>{
    const orders = await Order.find({user: req.user._id})

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id", 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
})

// Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next)=>{
    const orders = await Order.find()

    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id", 404))
    }

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update All Orders --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400))
    }

    order.orderItems.forEach(async (o)=>{
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now(); // Call Date.now() as a function
    } else {
        order.deliveredAt = undefined; // Reset deliveredAt if status is not "Delivered"
    }
    
    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.Stock-= quantity
    await product.save({validateBeforeSave: false})
    
}

// Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found in this Id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})