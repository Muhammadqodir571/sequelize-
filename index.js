const express = require('express')
const dotenv = require('dotenv')
const exhbs = require('express-handlebars')
const db = require('./models/index')

const app= express()
//intial dotenv  enveriable
dotenv.config()
//intialize templete engine    handlebars
app.use(express.json())
app.use(express.urlencoded({extended :false}))
app.engine('.hbs',exhbs.engine({extname:'.hbs'}))
app.set('view engine', '.hbs');
// app.set('views', './views');
//intilize routes
app.use('/diary',require('./routes/diary.route'))

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