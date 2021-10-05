const mongoose = require('mongoose')
const ViewLikeSchema = new mongoose.Schema({
    todo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        required:true
    },
    view: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique:true
    }],
    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique:true
    }],
    rating:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true })

module.exports = mongoose.model('ViewLike', ViewLikeSchema)