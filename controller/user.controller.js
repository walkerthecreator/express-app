const User = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = "mysecrettoken"


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

    const token = jwt.sign(secretData  , privateKey )
    res.cookie('token' , token , { maxAge : 1000 * 60 * 60 * 24 * 2 , http : true } )
    res.redirect('/todo')
}

async function signup(req , res){
    const { username , email , password} = req.body

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

    const token = jwt.sign(secretData  , privateKey)


    res.cookie('token' , token , { maxAge : 1000 * 60 * 60 * 24 * 2 , http : true }  )
    res.redirect('/todo')
}

module.exports = { login , signup , getLogin , getSignup }