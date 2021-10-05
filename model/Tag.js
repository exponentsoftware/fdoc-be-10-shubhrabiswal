const mongoose = require('mongoose')
const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        trim:true
    },
    category: {
        type: String,
        // required: true,
        trim:true
    },
    todo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        // required:true
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required:true
    }
}, { timestamps: true })
module.exports = mongoose.model('Tag', TagSchema)



