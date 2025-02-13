import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = './tmp/uploads'
    if (file.fieldname == "categoryImages") {
      dir += "/category"
    } else if (file.fieldname == "productImages") {
      dir += "/products"
    }
    // fs.mkdir(dir, error => cb(error))
    fs.access(dir, fs.constants.F_OK, exist => {
      if (exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    let filename = path.parse(file.originalname).name
    cb(null, filename + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

export default upload