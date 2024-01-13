const {Router} =require('express')
const {
    getMdiary,
    addNewdiary,
    getMdiaryById,
    getUpdateDiaryPage,
    postUpdateDiary,
    postDeleteDiary,
    postAddCommentDiary,
    getAlldiary
} = require('../controllers/diary.control')
const router = Router()
const {proctped} = require('../middlewares/auth')
const {body} = require('express-validator')
const upload = require('../utils/fileUpload')
router.get('/my',proctped,getMdiary )
router.get('/all',proctped,getAlldiary )
router.post('/add',upload.single('imageUrl'),
    body('text','Please add at least 3 charactaries your at diary').isLength({min:3}),
    proctped,addNewdiary)
router.get('/:id',proctped,getMdiaryById)
router.get('/update/:id',proctped,getUpdateDiaryPage)
router.post('/update/:id',proctped,postUpdateDiary)
router.post('/delete/:id',proctped,postDeleteDiary)
router.post('/comment/:id',proctped,postAddCommentDiary)




module.exports= router