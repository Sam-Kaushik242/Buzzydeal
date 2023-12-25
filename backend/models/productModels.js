const mongooose = require('mongoose')

const productSchema = mongooose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter product Name"]
    },
    description:{
        type: String,
        required: [true, "Please Enter product description"]
    },
    price:{
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [6, "Price cannot exceed 6 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[
        {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
    ],
    category:{
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    Stock:{
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongooose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

module.exports = mongooose.model("Product", productSchema)