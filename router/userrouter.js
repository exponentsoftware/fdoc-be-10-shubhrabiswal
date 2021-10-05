const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const payment = require('../controller/payment')

const auth = require('../middleware/auth')


router.get('/:id',auth.authuser.required,usercontroller.getalltodo);
router.get('/transaction/:id',usercontroller.transaction);  //auth.authuser.required,

router.post('/signin',usercontroller.signin)
router.post('/signup',usercontroller.adduser)

router.post('/createpayment',payment.createpayment)  //auth.authuser.required,
router.post('/verifypayment',payment.verifypayment)

// router.post('/like',auth.required,usercontroller.addlike)

module.exports = router;