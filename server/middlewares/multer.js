import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/uploads')
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now();
    let filename = path.parse(file.originalname).name
    cb(null, filename + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

export default upload