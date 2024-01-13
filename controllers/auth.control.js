const db = require('../models/index')
const User = db.user
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
//desc  Get all diaries page
//Route    GET/auth/my
//aeccess  public

const getMydiaryAuth = async (req,res) => {
    try {
        const isAuthenticated = req.session.isLogged
        res.render('auth/login',{
            title:'My Auth',
            isAuthenticated,
            errorMessage:req.flash('error')
            
        })
        
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  post all diaries page
//Route    post/diary/my
//aeccess  public

const postUserLogin = async (req,res) => {
    try {
        const isAuthenticated = req.session.isLogged
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render('auth/login',{
                title:'Login ',
                isAuthenticated,
                errorMessage:errors.array()[0].msg,
                oldInput:{
                    email:req.body.email
                }

            })
        }
        //email ktitilgan bolsa buni qaytatdan kritmaslik uchun logikka
      const userExist = await User.findOne({where:{email:req.body.email}}) 
      if(userExist){
        //Agar bizda email mavjud bo'lsa  paswordni tekshramiz 
        const matchPassword = await bcrypt.compare(req.body.password,userExist.password)
        
        if(matchPassword){
            req.session.isLogged = true,
            req.session.user = userExist,
            req.session.save((err)=>{
                if(err) throw err
                return res.redirect('/diary/my')
            })
        }else{
            req.flash('error','password to\'g\'ri kritish shart!')
            return res.status(400).render('auth/login',{
                title:'Login ',
                isAuthenticated,
                errorMessage:req.flash('error'),
                oldInput:{
                    email:req.body.email
                }

            })
        }
      }else{
        req.flash('error','password va email kritish shart!')
        return res.redirect('/auth/login')
      } 
      
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  Get Registration
//Route    GET/auth/registration
//aeccess  public

const getRegitrationPage = async (req,res) => {
    try {
        res.render('auth/registration',{
            title:'Registration',
            errorMessage:req.flash('error')
        })
        
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  Get Registration
//Route    post/auth/registration
//aeccess  public

const postRegitrationUser = async (req,res) => {
    try {
      const {email,name,password,password2} =req.body
      const isAuthenticated = req.session.isLogged
      const errors = validationResult(req)
    
      if(!errors.isEmpty()){
          return res.status(400).render('auth/registration',{
              title:'Registration ',
              isAuthenticated,
              errorMessage:errors.array()[0].msg,
              oldInput:{
                email,
                name,
                password,
                password2
              }

          })
      }
      //password tekshrish
      if(password!==password2){
        req.flash('error','password xato kritilgan!')
        return res.redirect('/auth/registration')
      }
      //email tekshirilmoqda 
      const UserExist = await User.findOne({where:{email}})
      
      if(UserExist && req.body.email ===''){
        req.flash('error','email oldim regitratsiadan o\'tgan?')
        return res.redirect('/auth/registration')
      }

      // hashga salt berish kerak  darajasi
      const salt =  await bcrypt.genSalt(10)
      //password hashlanish 
      const hashaPassword = await bcrypt.hash(password,salt)
      // req.body  bazaga saqlamoqda 
      await User.create({
        email,
        name,
        password:hashaPassword
      })
     
       return res.redirect('/auth/login')
        
    } catch (err) {
       console.log(err); 
    }
    
}

//desc     destroy user 
//Route    GET/diary/my
//aeccess  private
const  getDestroyUser = (req,res)=>{
    req.session.destroy(() =>{
        res.redirect('/auth/login')
    })
}
module.exports = {
    getMydiaryAuth,
    postUserLogin,
    getDestroyUser,
    getRegitrationPage,
    postRegitrationUser
    
}