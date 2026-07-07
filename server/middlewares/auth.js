const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{

    
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.json({
                success:false,
                message:"no Token Found"
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token){
             return res.json({success:false , message :"No token Found"});
        }
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {   
        
        return res.json({success:false, message:error.message});
    }
}

module.exports =  auth;