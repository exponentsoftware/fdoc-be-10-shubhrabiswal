const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
    user_name: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    todo_status: {
        type: String,
        enum: ["started", "in progress", "completed"],
        default: "started"
    },
    category: {
        type: String,
        enum: ["task", "hobby", "work"],
        default: "task"
    },
    
}, { timestamps: true })
module.exports = mongoose.model('Todo', TodoSchema)