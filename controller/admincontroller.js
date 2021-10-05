const User = require('../model/User')
const Todo = require('../model/Todo')
const Comment = require('../model/Comment')
const Tag = require('../model/Tag')
const Payment = require('../model/Payment')

const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}


exports.getalluser = async (req, res) => {

    try {
        // let all_user = await User.find()
        let all_user = await Todo.aggregate([
            {
              $lookup:
                {
                  from: "users",
                  localField: "user_name",    ///of Todo collection
                  foreignField: "_id",   // of User collection
                  as: "Todo_user_detail"
                }
           },
           {
            $lookup:
              {
                from: "comments",
                localField: "_id",
                foreignField: "todo_id",
                as: "All_comments"
              }
         },
         {
            $lookup:
              {
                from: "tags",
                localField: "_id",
                foreignField: "todo_id",
                as: "All_tags"
              }
         },
         ])
        
        
        return res.status(200).send({
            data: all_user
        })
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};

exports.transactions = async (req,res) => {

  try{
    let transactions = await Payment.find()
    return res.status(200).send({
      error:null,
      message:"All transactions fetched successfully",
      data:transactions
    })
  }
  catch(err){
    return res.status(400).send({
      failure,
      error:err.message
    })
  }
}