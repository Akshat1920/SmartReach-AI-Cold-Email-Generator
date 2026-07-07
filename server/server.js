const express = require('express');
const cors = require('cors');
const app = express();

//env file connection
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const authroute = require('./routes/authRoutes.js');
const airoute = require('./routes/aiRoutes.js');
const ConnectDb = require('./config/db.js');


ConnectDb();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authroute);

app.use('/api/ai',airoute);


app.get('/',(req,res)=>{
    res.send("Home page opened")
})

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})