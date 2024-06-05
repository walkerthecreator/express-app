const User = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Todo = require("../model/todo.model")
const joi = require("joi")


function getLogin(req , res){
    const user = req.cookies.token
    if(!user){
        res.render('login')
    }
    res.redirect('/todo')
}

function getSignup(req , res){
    const user = req.cookies.token
    if(!user){
        res.render('signup')
    }
    res.redirect('/todo')
}


async function login(req , res){
    const { username  , password } = req.body

    // validate data here 

    const user = await User.findOne({username : username})

    if(!user){
        return res.json({ message : "user not found" })
    }

    const checkPassword = await bcrypt.compare(password , user.password )
    if(!checkPassword){
        return res.json({ message : "incorrect password" })
    }

    const secretData = { _id : user._id ,
        email : user.email ,
        username : user.username 
      }

    const token = jwt.sign(secretData  , process.env.JWT_SECRET) 
    res.cookie('token' , token , { maxAge : 1000 * 60 * 60 * 24 * 2 , http : true } )
    res.redirect('/todo')
}

async function signup(req , res){
    const { username , email , password} = req.body

    // schema for validation check 
    const userJoiSchema = joi.object({
        username : joi.string().alphanum().min(3).max(12).required() ,
        email : joi.string().email().required() ,
        password : joi.string().min(5).max(18).required()
    })

    const isValid = userJoiSchema.validate({ username , password , email  }) 

    if(isValid.error){
        return res.status(400).json({ success : false , error : isValid.error.details[0].message })
    }

    const user = await User.findOne({ username : username })
    const userEmail = await User.findOne({ email: email })

    if(user){
        return res.json({message : "Username not available"})
    }

    if(userEmail){
        return res.json({ message : "email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt )

    
    // { username  } similar to { username : username }
    const userResult = await User.create({ username , email , password : hashedPassword })

    const secretData = { _id : userResult._id ,
        email : userResult.email ,
        username : userResult.username 
      }

    const token = jwt.sign(secretData  , process.env.JWT_SECRET )
    res.cookie('token' , token , { maxAge : 1000 * 60 * 60 * 24 * 2 , http : true }  )
    res.redirect('/todo')
}

async function getUserProfile(req , res) {
    const user = await User.findOne({ _id : req.user._id })
    const todos = await Todo.find({ user : req.user._id  })
    res.render('profile.ejs' , { user : user , todos : todos  })
}

module.exports = { login , signup , getLogin , getSignup , getUserProfile }
