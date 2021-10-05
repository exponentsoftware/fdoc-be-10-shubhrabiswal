const mongoose = require('mongoose')
const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    order_id: {
        type: String,
        required: true,
        trim:true
    },
    payment_id: {
        type: String,
        required: true,
        trim:true
    },
    amount: {
        type: Number,
        required:true
    },
    phone:{
        type:String
    }
    
}, { timestamps: true })
module.exports = mongoose.model('Payment', PaymentSchema)