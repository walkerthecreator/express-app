const Todo = require("../model/todo.model");

async function getTodos(req , res){
    const todo = await Todo.find();
    res.json(todo)
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
    res.json(item)
}

async function addTodo(req , res){
    const { task } = req.body
    const todo = await Todo.create({ todo : task })
    res.json(todo)
}

async function deleteTodo(req ,res){
    const {id} = req.params
    const todo = await Todo.deleteOne({ _id : id })
    res.json(todo)
}

module.exports = {
    getSingleTodo , updateTodo , getTodos , addTodo , deleteTodo 
}