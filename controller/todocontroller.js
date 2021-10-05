const Todo = require("../model/Todo");
const User = require("../model/User")
const ViewLike = require("../model/ViewLike")
const Comment = require("../model/Comment")
const Tag = require("../model/Tag")

const success = {
    error: null,
    message: "Task done successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}

exports.addtodo = async (req, res) => {

    try {
        let user = await User.findOne({_id:req.body.user_name})
        let todo_num = await Todo.find({user_name:user._id}).count()
        console.log(user.account_type,todo_num)
        if(user.account_type == "free" && todo_num==2){
            res.status(200).send({message:"Upgrade your account to continue"})
        }
        let new_todo = await new Todo(req.body).save()
        console.log(new_todo._id)
        console.log("new_todo",new_todo)
        let like_todo = await new ViewLike({todo_id:new_todo._id}).save()
        return res.status(200).send({
            error: null,
            data: new_todo,
            message: "Todo created successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while adding to the database"
        })
    }

};



exports.getalltodo = async (req, res) => {

    try {
        let all_todo = await Todo.find()
        return res.status(200).send({
            success,
            data: all_todo
        })
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};



exports.gettodoById = async (req, res) => {

    try {
        let todo = await Todo.findById({ _id: req.params.id });

        if (todo) {
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Task found successfully"
            })
        } else {
            return res.status(200).send({no_data})
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
};

exports.updatetodo = async (req, res) => {

    let id = req.params.id;

    try {
        let updated_todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).send({
            error: null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}


exports.deletetodo = async (req, res) => {

    let id = req.params.id;
    try {
        const todo = await Todo.findOneAndDelete({ _id: id });
        return res.status(200).send({
            error: null,
            data: todo,
            message: "Todo deleted successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while deleting data"
        })
    }
};


exports.bytitle = async (req, res) => {

    const title = req.body.title

    try {
        let todo = await Todo.find({ title: title });
        if (todo.length == 0) {
            return res.status(200).send({
                error: null,
                data: todo,
                message: `Task titled ${title} not present in the database`
            })
        } else {
            return res.status(200).send({
                error: null,
                data: todo,
                message: `Task titled ${title} found successfully`
            })
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
}

exports.bycategory = async (req, res) => {

    const cat = req.body.category

    try {
        let todo = await Todo.find({ category: cat });
        return res.status(200).send({
            error: null,
            data: todo,
            message: `Tasks found for category ${cat} `
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
}


exports.completetodo = async (req, res) => {

    let id = req.params.id;

    try {
        let todo = await Todo.findById({ _id: req.params.id });
        // console.log(todo)
        if (todo.todo_status == "completed") {
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Task is already completed"
            })
        }
        let updated_todo = await Todo.findByIdAndUpdate(id, { todo_status: "completed" }, { new: true })
        return res.status(200).send({
            error: null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}