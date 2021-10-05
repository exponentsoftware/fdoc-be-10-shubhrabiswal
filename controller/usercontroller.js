const User = require('../model/User')
const Todo = require('../model/Todo')
const passport = require('passport')
const Payment = require('../model/Payment')


const success = {
  error: null,
  message: "Success"
}
const failure = {
  data: null,
  message: "Error while fetching data"
}

const no_data = {
  error: null,
  message: "Not present in database"
}
const exists = {
  error: null,
  message: "Already present in database"
}

exports.adduser = async (req, res) => {
  const { body: { user } } = req;
  // console.log(req.body)
  try {
    let new_user = await new User(req.body)
    password = new_user.setPassword(req.body.password)
    // console.log(password)
    new_user.setPassword(req.body.password)
    await new_user.save()
    console.log(new_user, new_user.password)
    res.status(200).json({ user: new_user.toAuthJSON() })
  } catch (err) {
    return res.status(400).send({ failure, error: err.message })
  }

};


exports.signin = (req, res, next) => {
  // const { body: { user } } = req;

  // console.log(req.headers)
  const user = req.body
  console.log(user.email, user.password)
  if (!user.email) {
    return res.status(422).json({ errors: { email: 'is required', }, });
  }

  if (!user.password) {
    return res.status(422).json({ errors: { password: 'is required', }, });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    console.log(passportUser)
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      console.log(user)
      return res.json({ user: user.toAuthJSON(), success: "User sign in successful" });
    }

    return res.status(400).json({ info });
  })(req, res, next);
}



exports.getalltodo = async (req, res) => {
  try {
    let id = req.params.id
    let user = await User.findById({ _id: id });
    // console.log(user.role)
    if (user.role == "admin") {
      // let all_todo = await Todo.aggregate([
      //   { $sortByCount: "$todo_status" } 
      // ])
      let all_todo = await Todo.aggregate([
        { $match: { todo_status: { $eq: "completed" } } },
        {
          $group: {
            // "_id": "$_id",
            "user_name": "$user_name"
          }
        },
        { $sortByCount: "$todo_status" }
      ])
      // {$sortByCount:{todo_status:"completed"}}])
      return res.status(200).send({ data: all_todo })
    }
    if (user.role == "app_user") {
      // let todo = await Todo.find({ user_name: id });
      let todo = await Todo.find({ $and: [{ user_name: id }, { todo_status: "completed" }] });
      console.log(todo)
      return res.status(200).json({ success, data: todo })
    }
  } catch (err) {
    return res.status(400).send({ failure, error: err.message })
  }
};

exports.transaction = async (req, res) => {
  let id = req.params.id
  try {
    let transaction = await Payment.find({ user_id: id })
    return res.status(200).json({ success, data: transaction })
  } 
  catch (err) {
    return res.status(400).send({ failure, error: err.message })
  }
}




