
const db = require('../models/index')
const Diary=db.diary
const Comment=db.comment
const {Op}= require('sequelize')
//desc  Get all diaries page
const  User = db.user
const {validationResult} = require('express-validator')
//Route    GET/diary/my
//aeccess  private

const getMdiary = async (req,res) => {
    try {
       const diaries = await Diary.findAll(
            {
            where :{userId:req.session.user.id},
            raw:true,
            plain:false,
            include:['user'],
            nest:true
        })
        
        res.render('diary/my-diary',{
            title:'My diary',
            diaries:diaries.reverse(),
            isAuthenticated:req.session.isLogged,
            errorMessage:req.flash('error')
           
        })
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  Get all diaries 
//Route    GET/diary/all
//aeccess  private

const getAlldiary = async (req,res) => {
    try {
        const totalData = await Diary.count()
        const itemsLimit = 2
        const page = +req.query.page || 1
        const lastPage = Math.ceil(totalData /itemsLimit)
       const diaries = await Diary.findAll(
            {
             
            raw:true,
            plain:false,
            include:['user'],
            nest:true,
            limit:itemsLimit,
            offset:(page - 1)*itemsLimit
        })
      
        res.render('diary/all-diary',{
            title:'all diary',
            diaries:diaries.reverse(),
            isAuthenticated:req.session.isLogged,
            totalData:totalData,
            curentPage:page,
            nextPage:page + 1,
            previousPage:page-1,
            hasNextPage: page * itemsLimit<totalData,
            hasPreviousPage:page - 1,
            lastPage: lastPage,
            curentPageAndPrevPageNotEqualeOne: page !==1 && (page - 1) !==1,
            lastPageChecking:lastPage !== page && (page+1) !==lastPage
            
        })
    } catch (err) {
       console.log(err); 
    }
    
}

//desc  Get create diaries
//Route  post/diary/my
//aeccess  private

const addNewdiary = async(req,res) => {
try {
    const { text} = req.body
    console.log(req.file)
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const diaries = await Diary.findAll(
            {
             where:{userId:{[Op.ne]:req.session.user.id}},  
            raw:true,
            plain:false,
            include:['user'],
            nest:true
        })
        return res.status(400).render('diary/my-diary',{
            title:'My diaryies',
            isAuthenticated:req.session.isLogged,
            diaries:diaries.reverse(),
            errorMessage:errors.array()[0].msg,
            
        })}
        //if else ternar operatori deyiladi ? :
        const fileName  = req.file ? '/uploads/'+req.file.filename:''
    await Diary.create({
        imageUrl:fileName,
        text:text,
        userId: req.session.user.id
    })  


   res.redirect('/diary/my')
} catch (err) {
    console.log(err);
}}

//desc  Get all diaries one page id
//Route    GET/diary/:id
//aeccess  private

const getMdiaryById = async (req,res) => {
    try {
       
        const data= await Diary.findByPk(req.params.id,{
           
            raw:false,
            plain:true,
            include:['comment','user'],
            nest:true
        }
        )
        const diary=await data.toJSON()
      
        
        res.render('diary/one-diary',{
            title:'Diary',
            diary:diary,
            comments:diary.comment.reverse(),
            isAuthenticated:req.session.isLogged,
            errorMessage:req.flash('error')
            
        })
    } catch (err) {
       console.log(err); 
    }
}
//desc  update diaries one page id
//Route    GET/diary/update/:id
//aeccess  private

const getUpdateDiaryPage = async (req,res) => {
    try {
        const diary= await Diary.findByPk(req.params.id,{
           
            raw:true
        }
        )
        res.render('diary/update-diary',{
            title:'Update diary',
            diary:diary,
            isAuthenticated:req.session.isLogged,
            errorMessage:req.flash('error')
        })
    } catch (err) {
       console.log(err); 
    }
}
//desc  created  update diaries one page id
//Route    POST/diary/update/:id
//aeccess  private

const postUpdateDiary = async (req,res) => {
    try {
       await Diary.update({text:req.body.text},{
        where:{id:req.params.id},
        raw:true
       })
       if(req.body.text ===''){
        req.flash('error','Text kritish shart!')
        return res.redirect('/diary/my')
       }
      res.redirect('/diary/my')
    } catch (err) {
       console.log(err); 
    }
}
//desc  delete by  id
//Route    POST/diary/delete/:id
//aeccess  private
const postDeleteDiary = async (req,res) => {
    try {
       await Diary.destroy({
        where:{id:req.params.id},
       })
      res.redirect('/diary/my')
    } catch (err) {
       console.log(err); 
    }
}
//desc  New comment 
//Route    POST/diary/comment/:id
//aeccess  private
const postAddCommentDiary = async (req,res) => {
    try {
        const user = await User.findByPk(req.session.user.id)
        if(req.body.comment===''){
            req.flash('error','comment kritish shart!')
            return res.redirect('/diary/' + req.params.id)
        }
       await Comment.create({
        name:user.name,
        comment:req.body.comment,
        diaryId:req.params.id,
        userId:user.id
       })
      res.redirect('/diary/' + req.params.id)
    } catch (err) {
       console.log(err); 
    }
}



module.exports = {
    getMdiary,
    addNewdiary,
    getMdiaryById,
    getUpdateDiaryPage,
    postUpdateDiary,
    postDeleteDiary,
    postAddCommentDiary,
    getAlldiary

}

