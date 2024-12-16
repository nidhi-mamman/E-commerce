const express=require("express")

const {signUp,signIn,getUser,sendOtp,submitOtp}=require('../controllers/user')
const authMiddleware=require('../middleware/authmiddleware')

const router=express.Router()

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/send-otp',sendOtp)
router.post('/submit-otp',submitOtp)
router.get('/user',authMiddleware,getUser)

module.exports=router