const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = file.mimetype;
        console.log(ext);
        if(ext !== 'image/jpg' && ext !== 'image/jpeg' && ext !== 'image/webp' && ext !== 'image/png' ) {
            return cb(new Error('Only .jpg, .jpeg, .png and .webp are supported'));
        }
        cb(null, true);
    },
    fileSize: 2000000
});

module.exports = upload;