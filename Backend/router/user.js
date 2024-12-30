const express=require("express")
const authMiddleware=require('../middleware/authmiddleware')
const {signUp,signIn,getUser,sendOtp,submitOtp,addToCart,removeFromCart,getCart}=require('../controllers/user')

const router=express.Router()

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/send-otp',sendOtp)
router.post('/submit-otp',submitOtp)
router.post('/addToCart',authMiddleware,addToCart)
router.post('/removeFromCart',authMiddleware,removeFromCart )
router.post('/getCart',authMiddleware,getCart )
router.get('/user',authMiddleware,getUser)

module.exports=router