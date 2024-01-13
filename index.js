const express = require('express')
const dotenv = require('dotenv')
const exhbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const pgStores= require('connect-pg-simple')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const pool = require('./config/db')
const db = require('./models/index')


const app= express()
//intial dotenv  enveriable
dotenv.config()
//intialize templete engine    handlebars
app.use(express.json())
app.use(express.urlencoded({extended :false}))

//initialize session 
app.use(session({
   store: new pgStores({
      pool:pool,
      tableName:'user_session',
      
      
   }),
   secret:'my secret value',
   resave: false,
   saveUninitialized:false
}))
//intielize flash 
app.use(flash())

app.engine('.hbs',exhbs.engine({extname:'.hbs'}))
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname,'pubilc')))



// app.set('views', './views');
//intilize routes
app.use('/diary',require('./routes/diary.route'))
//initialize csurf
app.use(csrf())
//csrf intialize
app.use((req,res,next)=>{
   res.locals.csrfToken = req.csrfToken()
   next()
})
app.use('/auth',require('./routes/auth.routes'))
app.use('/user',require('./routes/user.route'))
app.use('/',(req,res)=>{
   if(req.session.isLogged){
      return res.redirect('/diary/my')
   }
   else{
      res.redirect('/auth/login')
   }
})
const port = process.env.port || 6000
const start = async ()=>{
 try {
    
      await db.sequelize.sync()
   
    
    app.listen(port, () =>{
        console.log(`server  running on port :${port}`);
    })
 } catch (err) {
    console.log(err);
 }
}


start()