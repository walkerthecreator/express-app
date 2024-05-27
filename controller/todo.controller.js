const Todo = require("../model/todo.model");

async function getTodos(req , res){
    const todo = await Todo.find();
    res.render("todo.ejs" , { todos : todo  })
}

// @method GET 
// @route /todo/:id
async function getSingleTodo(req , res){
    const { id } = req.params //1
    const item = await Todo.findOne({ _id : id })
    res.json(item)
}

// @method PUT
// @route /todo/update/:id
async function updateTodo(req , res){
    const { id } = req.params
    const { task , status } = req.body 
    let item = await Todo.updateOne({ _id : id  } , { todo : task , status : status })
    res.redirect('/todo')
}

async function addTodo(req , res){
    const { task } = req.body
    const todo = await Todo.create({ todo : task })
    res.redirect('/todo')
}

async function deleteTodo(req ,res){
    const {id} = req.params
    const todo = await Todo.deleteOne({ _id : id })
    res.redirect('/todo')
}

module.exports = {
    getSingleTodo , updateTodo , getTodos , addTodo , deleteTodo 
}