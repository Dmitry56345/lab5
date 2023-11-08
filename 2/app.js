const express = require("express");
const multer  = require("multer");
  
const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png"|| 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"||
	file.mimetype === "image/cvg"){
		cb(null, true)
	}
	else {
		cb(null, false)
	}
 }

app.use(express.static(__dirname));

app.use(multer({storage:storageConfig, fileFilter: fileFilter, limit: {fileSize: 10485760} }).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, ()=>{console.log("Server started");});
