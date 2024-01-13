const db = require('../models/index')
const User = db.user
const Diary= db.diary

//desc  Get user profile
//Route    GET/user/profile/:id
//aeccess  private

const getProfile = async (req,res) => {
    try {
        //userni id yani id profiledan  topish open id 
      const user = await  User.findOne({
        where:{id: req.params.id},
        raw:true
    })
    //umumiy diariesni chiqarish 
      const  diaries = await Diary.findAll({
        where:{userId: user.id},
        raw :true
      })
      // 
        res.render('user/profile',{
            title:user.name,
            user:user,
            diariesLength: diaries.length,
            isAuthenticated:req.session.isLogged,
            
        })
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  Get my profile
//Route    GET/user/profile/my
//aeccess  private

const getMyProfile = async (req,res) => {
    try {
        const user = req.session.user
           const  diaries = await Diary.findAll({
        where:{userId: user.id},
        raw :true
      })
        res.render('user/myprofile',{
            title:user.name,
            user:user,
            diariesLength: diaries.length,
            isAuthenticated:req.session.isLogged,
            errorMessage:req.flash('error')
        })
    } catch (err) {
       console.log(err); 
    }
    
}
//desc  Get upadete profile page
//Route    GET/user/profile/my
//aeccess  private

const updateProfilePage = async (req,res) => {
  try {
      const user = req.session.user
     
 
      res.render('user/update-profile',{
          title:user.name,
          user:user,
          isAuthenticated:req.session.isLogged
      })
  } catch (err) {
     console.log(err); 
  }
  
}
//desc  Get upadete profile 
//Route    GET/user/profile/my
//aeccess  private

const updateProfile = async (req,res) => {
  try {
    const user= await User.findOne({
      where:{id:req.session.user.id},
      raw:true,
      
      
    })
    if(req.body.email===user.email  && user.email ===''){
      req.flash('error','emailni kritish shart va majbur!')
      return res.redirect('/user/profile/update')
    }
     const newDetalis=await User.update({email:req.body.email, name:req.body.name},{
      where:{id:req.session.user.id},
      returning:true,
      raw:true,
      plain:true
    })
    req.session.user = newDetalis[1]
    req.session.save( (err)=>{
      if(err) throw err
      return res.redirect('/user/myprofile/my')
    })
   
    //  res.render('user/update-profile',{
    //       title:user.name,
    //       user:user,
    //       isAuthenticated:req.session.isLogged
      // })
  } catch (err) {
     console.log(err); 
  }
  
}

module.exports = {
    getProfile,
    getMyProfile,
    updateProfilePage,
    updateProfile
}