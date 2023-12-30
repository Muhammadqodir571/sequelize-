const {Router} =require('express')
const {
    getMdiary,
    addNewdiary,
    getMdiaryById,
    getUpdateDiaryPage,
    postUpdateDiary,
    postDeleteDiary,
    postAddCommentDiary
} = require('../controllers/diary.control')
const router = Router()
router.get('/my',getMdiary )
router.post('/add',addNewdiary)
router.get('/:id',getMdiaryById)
router.get('/update/:id',getUpdateDiaryPage)
router.post('/update/:id',postUpdateDiary)
router.post('/delete/:id',postDeleteDiary)
router.post('/comment/:id',postAddCommentDiary)




module.exports= router