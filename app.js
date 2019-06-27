const express = require ('express');
const multer = require ('multer');
const ejs = require ('ejs');
const path = require ('path');

// Set Storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.orignalname));   
     }
});

// Init Upload
const upload = multer({
    storage:storage, 
    limits:{fileSize:1000000}
}).single('myImage');

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req,res) => res.render('index'));

app.post('/upload',(req,res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg:err
            });
        } else {
            if(req.file == undefined){
                res.render('index',{
                    msg:'Error:No file selected!'
                });
            } else {
                res.render('index',{
                    msg:'File Uploaded',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});
const port = 3000;
app.listen(port,() => console.log(`server started on port 3000`));
