const {Router} =require('express')
const {
    getProfile,
    getMyProfile,
    updateProfilePage,
    updateProfile
   } = require('../controllers/user.control')
const {  proctped }= require('../middlewares/auth')
const router = Router()


router.get('/myprofile/my',proctped,getMyProfile )
router.get('/profile/update',proctped,updateProfilePage )
router.post('/profile/update',proctped,updateProfile )
router.get('/profile/:id',proctped,getProfile )





module.exports= router