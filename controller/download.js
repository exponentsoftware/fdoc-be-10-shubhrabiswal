const Todo = require('../model/Todo');
const User = require('../model/User')

const excel = require("exceljs");

exports.download = async (req, res) => {
    let arr = []
    let users = await User.find()
  
    for(let user of users) {
        // console.log(user)
        let todos = await Todo.find({ user_name: user._id })

        for(let todo of todos){
            // console.log(todo)
            arr.push({
                id: user._id,
                email: user.email,
                todo_id: todo._id,
                title: todo.title,
                todo_status: todo.todo_status,
                category: todo.category
            })
        }
        // break
    }
    // res.status(200).json({arr})
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");
    worksheet.columns = [
        { header: "UserId", key: "id", width: 25 },
        { header: "Email", key: "email", width: 25 },
        { header: "TodoId", key: "todo_id", width: 25 },
        { header: "Title", key: "title", width: 25 },
        { header: "Status", key: "todo_status", width: 25 },
        { header: "Category", key: "category", width: 25 },
        ];
    
    
    await worksheet.addRows(arr);
    await res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
    await res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "user.xlsx"
        );
        
    return await workbook.xlsx.write(res).then(function () {
        res.status(200).end();
        });
}


