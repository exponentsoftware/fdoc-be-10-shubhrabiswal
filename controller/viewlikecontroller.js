const ViewLike = require('../model/ViewLike')

// Create one API to get task either by most views, likes and ratings
const failure = {
    data: null,
    message: "Error while fetching data"
}

exports.addlike = async (req,res) => {
    let todo_id = req.params.id
    let like_by = req.body.like
    try {
        let like = await ViewLike.findOneAndUpdate(
            {todo_id:todo_id},
            {$addToSet: { like: like_by }},
            {new:true}
            )
        return res.status(200).send({data: like})
    } catch (err) {
        return res.status(400).send({failure,error: err.message})
    }
}

exports.getlikes = async (req,res) => {
    let todo_id = req.params.id
    try {
        let like = await ViewLike.aggregate([{
            $project:{
                like:{$size:"$like"}
            }
        },{$sort:{total:-1}}])
        return res.status(200).send({data: like})
    } catch (err) {
        return res.status(400).send({failure,error: err.message})
    }
}
