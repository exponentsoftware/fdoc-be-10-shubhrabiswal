const Todo = require("../model/Todo");
const User = require("../model/User");
const Tag = require("../model/Tag");

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


exports.addtag = async (req, res) => { 
    try {
        let tag = await Tag(req.body).save()
        return res.status(200).send({ data: tag })
    } catch (err) {
        return res.status(400).send({ failure, error: err.message })
    }
}




exports.gettag = async (req, res) => {
    todo_id = req.params.id
    try {
        let tag = await Tag.find({ todo_id: todo_id });

        if (tag) {
            return res.status(200).send({
                error: null,
                data: tag,
                message: "Tags found successfully"
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


exports.updatetag = async (req, res) => {

    let id = req.params.id;
    let user_id = req.body.user_id
    let title = req.body.title_tag
    let category = req.body.category

    try {
        let tag = await Tag.findById({_id:id})
        let user = await User.findById({ _id: user_id });
        if (user.role == "admin") {
            let updated_tag = await Tag.findOneAndUpdate(
                id,
                { title: title, category: category },
                { new: true })
            return res.status(200).send({
                error: null,
                data: updated_tag,
                message: "Tag updated successfully by admin"
            })
        }
        console.log(user.role,tag.posted_by,user_id)
        if (user.role == "app_user" && tag.posted_by == user_id) {
            let updated_tag = await Tag.findOneAndUpdate(
                id,
                { title: title, category: category },
                { new: true })
            return res.status(200).send({
                error: null,
                data: updated_tag,
                message: "Tag updated successfully by app_user"
            })
        }

    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}

exports.deletetag = async (req, res) => {

    let id = req.params.id;
    let user_id = req.query.id;
    try {
        // let tag = await Tag.findById({ _id: id })
        let user = await User.findById({ _id: user_id })
        console.log(user)
        if (user.role == "admin") {
            const tag = await Tag.findOneAndDelete({ _id: id });
            return res.status(200).send({
                error: null,
                data: tag,
                message: "Tag deleted successfully"
            })
        }else{
            return res.status(200).send({message:"Admin access required"})
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while deleting data"
        })
    }
};