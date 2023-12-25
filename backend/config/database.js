const mongooose = require('mongoose')

const connectDB = () => {
    mongooose.connect(process.env.DB_URL).then((data)=>{
        console.log(`MongoDB is connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;