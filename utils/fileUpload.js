const multer = require('multer')
const path = require('path')

//create and set storage

const storage = multer.diskStorage({
    destination: './pubilc/uploads/',
    filename:function(req,file , cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }  
    
})
//file uploade for image formats
const upload = multer({
    storage:storage,
    limits:{fileSize:50000000},
    fileFilter:function(req, file ,cb){
        checkFileTypes(file , cb)
    }
})

// check file for image format
function checkFileTypes( file , cb){
   //reguliree expretions
   const fileTypes = /jpeg|png|jpg|gif/
   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
   // image.png => png +>mimTtpes
   const mimetype = fileTypes.test(file.mimetype)
   if(mimetype && extname){
    cb(null, true)
   }else{
    cb('Error:you can only upload image files')
   }

}

module. exports = upload