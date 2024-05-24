const express = require('express')
const app = express()
const db = require("./config/dbconfig.js")
const cookieParser = require('cookie-parser')

//  arr = ["nitin" , "aman" , "akshay" , "ronit"]
app.set("view engine" , "ejs" )

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser())

app.use('/todo' , require("./routes/todo.routes.js") )
app.use('/user' , require("./routes/user.routes.js"))




app.listen( 3000 , ()=>{
    console.log('server started at 3000 ')
} )

