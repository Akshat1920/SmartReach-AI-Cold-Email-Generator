const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController.js');
const sendEmail = require('../utils/SendEmail.js');


//register a new User
router.post('/register' , authController.registerUser);

// router.get('/test-mail',async (req,res)=>{
//     await sendEmail(
//         "akshu.k2005@gmail.com",
//         "456789"
//     );
//     res.send("Mail sent");
// });

//login the user 
router.post('/login' , authController.loginUser);

//verify the otp 
router.post('/verify',authController.verifyEmail);

module.exports = router;