const Razorpay = require('Razorpay');
const crypto = require('crypto')
const env = require('dotenv')
const twilio = require("twilio")
const Payment = require('../model/Payment')

env.config()

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = new twilio(accountSid, authToken);

exports.createpayment = async (req, res) => {
    console.log(req.headers)
    const { amount, currency, receipt, notes } = req.body;
    try {
        let payment = await razorpayInstance.orders.create({
            amount,
            currency,
            receipt,
            notes
        })

        res.status(200).json({
            data: payment,
            message: "Payment created successsfully"
        })
    } catch (err) {
        return res.status(400).send({
            data: null,
            message: "Error while payment",
            error: err.message
        })
    }
}
// {razorpay_payment_id: 'pay_I5etFSc5VcUfaF', 
// razorpay_order_id: 'order_I5ePrBOHemmjou'} order_I5hHzkOPmsSNCE

exports.verifypayment = (req, res) => {
    const order_id = req.body.order_id
    const payment_id = req.body.payment_id

    console.log(req.body)
    const razorpay_signature = req.headers['x-razorpay-signature'];
    
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    let hmac = crypto.createHmac('sha256', key_secret);

    hmac.update(order_id + "|" + payment_id);

    const generated_signature = hmac.digest('hex');
    console.log(razorpay_signature,"\n",generated_signature)
    if (razorpay_signature === generated_signature) {
        var message = `Your payment has been verified successfully`
        var to = req.body.phone  //`+ ${user.PhCountryCode} ${user.phoneNo}`
        client.messages.create({
                body: message,
                to: to,
                from: process.env.TWILIO_PHONE_NUMBER
            })
        new Payment(req.body).save()
        
        res.json({ success: true, message: "Payment has been verified" })
    }
    else {
        res.json({ success: false, message: "Payment verification failed" })
    }

}

