const express = require('express')
const router = express.Router() 

const { getSingleTodo , updateTodo , getTodos , addTodo, deleteTodo } = require("../controller/todo.controller.js")

// get all todo 

router.get('/' ,  getTodos )
router.get('/:id' , getSingleTodo)

router.post('/' , addTodo)

router.get('/delete/:id' , deleteTodo )


router.post('/update/:id' , updateTodo  )
// router.get('/update/:index' , updateTodo )



module.exports = router 