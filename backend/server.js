const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')

var app = express();

app.use(fileUpload());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.post('/upload', (req, res)=> {
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/public/uploads/${file.name}`, err =>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
})


// send files that were uploaded by the user
app.get('/list', (req, res)=> {

    fs.readdir(`${__dirname}/public/uploads`,function(err, files) {
        if (err) {
           return console.error(err);
        }
        res.send({'files': files})
     });
})

// download the file the user clicks on
app.post('/download',(req, res)=> {
    const {fileName} = req.body
    console.log("1",fileName)
    res.download(`./public/uploads/${fileName}`, "file")
    console.log('download')
})

app.listen(5000, ()=> console.log('Server Started...'));