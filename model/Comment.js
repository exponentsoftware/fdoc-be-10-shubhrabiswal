const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        // required: true,
        trim:true
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    todo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }
}, { timestamps: true })
module.exports = mongoose.model('Comment', CommentSchema)

