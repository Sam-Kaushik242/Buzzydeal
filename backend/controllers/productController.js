const Product = require('../models/productModels');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require("../utils/apiFeatures")

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    let product = await Product(req.body);
    product = await product.save()
    res.status(201).json({success: true, product})
});

exports.getAllProducts = async (req, res, next) => {
    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeatures.query;
    res.status(200).json({ success: true, products, productsCount, resultPerPage });
};


exports.updateProduct = catchAsyncErrors(async (req, res) => {
    const products = await Product.findById(req.params.id);
    if(!products){
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators:true, 
        useFindAndModify:false
    });
    res.status(200).json({ success: true, product});
});

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    };
    products = await Product.findByIdAndDelete(req.params.id, req.body, {
        new: true, 
        runValidators:true, 
        useFindAndModify:false
    });
    res.status(200).json({ success: true, message:"Product Deleted"});
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("Product Not found", 404));
        };
        res.status(200).json({ success: true, product});
    }
);


