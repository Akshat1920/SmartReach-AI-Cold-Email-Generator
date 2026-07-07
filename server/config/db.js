const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const ConnectDb =async  ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("Database connected Successfully"));
    } catch (error) {
        console.log("Database Connection Error : ", error.message)
    }
}

module.exports = ConnectDb;