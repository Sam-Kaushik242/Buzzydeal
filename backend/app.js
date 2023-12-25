const express = require('express')
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const dotenv = require("dotenv")

//Config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Route Imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

// MiddleWare for Errors
const errorMiddleware = require("./middleware/error");

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)
app.use(errorMiddleware)

module.exports = app