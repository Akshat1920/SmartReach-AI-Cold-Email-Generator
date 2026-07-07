import User from "../models/User.js";
import sendEmail from "../utils/SendEmail.js";
import jwt from 'jsonwebtoken';

//Register the new user
export const registerUser = async (req,res)=>{
    try {

        const {name , password , email} = req.body;


        //Backend Validation
        if(!name || !password || !email ){
            return res.json({success:false , message:"All Fields are Required"});
        }

         const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({success:false , message:"Email Already in Use"});
        }

        if(password.length < 6){
            return res.json({success:false , message:"Password Should be atleast 6 Characters"})
        }

        if(!/\S+@\S+\.\S+/.test(email)){
           return  res.json({success:false , message:"Invalid Email Format"});
        }

       

        //create a random 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        //create a expiry time for otp
        const otpexpiry = new Date(Date.now() + 10 * 60 * 1000); //10 minutes after sending



        const user = await User.create({name , password , email , otp , otpexpiry});
        

        //otp send to user
        await sendEmail(email , otp);

        return  res.json({success:true, message:"User Created Successfully" , userId: user._id , email: user.email});

        
    } catch (error) {
        return res.json({success:false ,message:error.message });
    }
}

//verify the email by entering and checking the otp
export const verifyEmail = async (req,res)=>{
    try {
        
    const {email , otp} = req.body;

    if(!email || !otp){
        return res.json({success:false , message:"Email and Otp Required"});
    }

     const user = await User.findOne({email});

     if(!user){
        return res.json({success:false , message:"User not found"});
     }

     if(user.otp != otp){
        return res.json({success:false , message:"Invalid OTP"});   
     }

     if(user.otpexpiry < Date.now()){
        return res.json({success:false , message:"OTP expired"});
     }

     if(user.isverified==true){
        return res.json({success:false,message:"User Already Verified"});
     }

     user.isverified = true;
     user.otp = null;
     user.otpexpiry = null;

      const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

     await user.save();
    return res.json({success:true , 
      message:"User Email Verified Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token 
    });


    } catch (error) {
        return res.json({success:false , message:error.message});
    }
}

export const loginUser = async(req,res)=>{

    try {
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!email || !password){
            return res.json({success:false , message:"Please Enter All The Fields."});
        }

        if(!user){
            return res.json({success:false , message:"User Does not Exist"});
        }

        if(!user.isverified){
            return res.json({success:false , message:"User Not verified . Please verify your Email."});
        }
        
        const isMatched = await user.comparePassword(password);

        if(!isMatched){
            return res.json({success:false , message:"Invalid Credentials"});
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        return  res.json({
            success:true , 
            message:"User Logged In Successfully" , 
            token , 
            _id: user._id,
            name: user.name,
            email: user.email,});

    } catch (error) {
       return  res.json({success:false , message : error.message});
    }
}