import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, file, calllback){
        calllback(null, "public/uploads")
    },
    filename: function(req, file, calllback){
        calllback(null, new Date().toISOString()+'-'+file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fieldSize: 1024*1024}
})

export default upload