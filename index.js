const express = require('express')
const app = express()
const db = require("./config/dbconfig.js")
const cookieParser = require('cookie-parser')
const auth = require('./middlewares/auth.js')
const path = require("path")

//  arr = ["nitin" , "aman" , "akshay" , "ronit"]
app.set("view engine" , "ejs" )

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser())

// absolute path of directory 
let staticPath = path.join( __dirname , "public" )
// d:/node/node-start , public . path.join => d:/node/node-start/public 

app.use(express.static(staticPath))

app.get('/' , (req , res)=>{
    res.render('home.ejs')
})

app.get('/logout' , (req , res)=>{
    res.cookie("token" , "")    
    res.redirect('/user/login')
})

app.use('/todo' , auth , require("./routes/todo.routes.js") )
app.use('/user' , require("./routes/user.routes.js"))

// authenticate / authorization 


app.listen( 3000 , ()=>{
    console.log('server started at 3000 ')
} )

