const User = require("../model/user.model")
const bcrypt = require('bcrypt')


function getLogin(req , res){

    const user = req.cookies.user
    if(!user){
        res.render('login')
    }

    res.redirect('/todo')
}

function getSignup(req , res){
    const user = req.cookies.user
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
    res.cookie("user" , user.username)
    // res.json({ message : "logged in" })
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
    res.cookie('user' , userResult.username)
    res.json(userResult)
}

module.exports = { login , signup , getLogin , getSignup }