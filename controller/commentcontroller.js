const Todo = require("../model/Todo");
const Comment = require("../model/Comment");
const User = require("../model/User");

const success = {
    error: null,
    message: "Found successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}


exports.addcomment = async (req, res) => {
    try {
        let comment = await Comment(req.body).save()
        return res.status(200).send({ data: comment })
    } catch (err) {
        return res.status(400).send({ failure, error: err.message })
    }
}




exports.getcomment = async (req, res) => {

    try {
        let comment = await Comment.find({ todo_id: req.params.id });

        if (comment) {
            return res.status(200).send({
                error: null,
                data: comment,
                message: "Task found successfully"
            })
        } else {
            return res.status(200).send({ no_data })
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
};


exports.updatecomment = async (req, res) => {

    let id = req.params.id;
    let user_id = req.body.user_id
    try {
        let comment = await Comment.findById({_id:id})
        // console.log(comment)
        let user = await User.findById({ _id: user_id });
        if (user.role == "admin") {
            let updated_comment = await Comment.findOneAndUpdate(
                id,
                { text: req.body.text },
                { new: true })
            return res.status(200).send({
                error: null,
                data: updated_comment,
                message: "Comments updated successfully by admin"
            })
        }
        
        if (user.role == "app_user" && comment.posted_by == user_id) {
            let updated_comment = await Comment.findOneAndUpdate(
                id,
                { text: req.body.text },
                { new: true })
            return res.status(200).send({
                error: null,
                data: updated_comment,
                message: "Comments updated successfully by app_user"
            })
        }else{
            return res.status(200).send({message:"Access denied"})
        }

    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}

exports.deletecomment = async (req, res) => {

    let id = req.params.id;
    let user_id = req.query.id;
    try {
        let comment = await Comment.findById({ _id: id })
        let user = await User.findById({ _id: user_id })
        // console.log(user)
        if (user.role == "admin") {
            const todo = await Comment.findOneAndDelete({ _id: id });
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Comment deleted successfully"
            })
        }
        
        if (user.role == "app_user" && comment.posted_by == user_id) {
            const todo = await Comment.findOneAndDelete({ _id: id });
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Comment deleted successfully"
            })
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while deleting data"
        })
    }
};