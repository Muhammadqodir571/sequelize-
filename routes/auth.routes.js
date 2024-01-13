const {Router} =require('express')
const {
    getMydiaryAuth, 
    postUserLogin,
    getDestroyUser,
    getRegitrationPage,
    postRegitrationUser
    
} = require('../controllers/auth.control')
const { guest, proctped }= require('../middlewares/auth')
const {body,check} = require('express-validator')
const router = Router()


router.get('/login',guest,getMydiaryAuth )
router.post('/login',
    [
        check('email').
        isEmail().
            withMessage('Please enter vlaid email adress'),
            body('password','Password must  be at least 6 characters').isLength({min:6})
    ],
guest,postUserLogin)
router.get('/registration',guest,getRegitrationPage)
router.get('/logout',proctped,getDestroyUser)
router.post('/registration',
[
    body('email','lease enter vlaid email adress vs Registration').isEmail(),
    body('name','Name can contian only alpahbetical characters').isAlpha(),
    body('password','Password must  be at least 6 characters with alpahbetical a be enter').isLength({min:6}).isAlphanumeric()
],guest,postRegitrationUser)




module.exports= router