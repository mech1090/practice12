const bcrypt = require('bcrypt')
const userService = require('../service/user.service')
const config = require('config')
const {validationSchema} = require('../validation/user.validation')



const getLoginFrom = (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await userService.findEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not Exist please Signup'})
    }
    const matchPassword = await bcrypt.compare(password, findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'CREDENTIALS MISMATCHED'})
    }
    return res.render('user/layout')
}

const getSignupForm = (req,res)=>{
    return res.render('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validationSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const findUser = await userService.findEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User already Exists  Login Here'})
    }
    const createUser = await userService.CreateFields({email,password:hashPassword})
 
    return res.render('signup/layout',{message:'USER CREATED'})
}

module.exports =  {getLoginFrom,login,getSignupForm,signup}