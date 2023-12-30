
const db = require('../models/index')
const Diary=db.diary
const Comment=db.comment
//desc  Get all diaries page
//Route    GET/diary/my
//aeccess  private

const getMdiary = async (req,res) => {
    try {
        const diaries= await Diary.findAll(
            {
                raw: true
            }
        )
        res.render('diary/my-diary',{
            title:'My diary',
            diaries:diaries.reverse()
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
    const {imageUrl, text} = req.body
     await Diary.create({
        imageUrl: imageUrl,
        text:text
    })  


    res.redirect('/diary/my')
} catch (err) {
    console.log(err);
}
}

//desc  Get all diaries one page id
//Route    GET/diary/:id
//aeccess  private

const getMdiaryById = async (req,res) => {
    try {
       
        const data= await Diary.findByPk(req.params.id,{
           
            raw:false,
            plain:true,
            include:'comment',
            nest:true
        }
        )
        const diary=await data.toJSON()
      
        
        res.render('diary/one-diary',{
            title:'Diary',
            diary:diary,
            comments:diary.comment.reverse()
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
            diary:diary
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
       })
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
       await Comment.create({
        name:'Username',
        comment:req.body.comment,
        diaryId:req.params.id
       })
      res.redirect('/diary/'+req.params.id)
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
    postAddCommentDiary

}
    
