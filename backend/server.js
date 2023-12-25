const app = require('./app'); // Assuming your app instance is exported from app.js
const dotenv = require('dotenv');
const connectDB = require("./config/database")
const cloudinary = require('cloudinary')
dotenv.config({ path: "backend/config/config.env" });

// Handling UnCaught Exception
// process.on("uncaughtException", (err)=>{
//     console.log(`Error: ${err.message}`);
//    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
//    process.exit(1);
// })
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_Key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 3000; // Use the specified port in your environment variables or default to 3000

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandeled Promise Rejection
// process.on("unhandledRejection", (err)=>{
//     console.log(`Error: ${err.message}`);
//    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
//    server.close(()=>{
//        process.exit(1);
//    })
// })