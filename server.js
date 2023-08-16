const express = require('express')
const app  = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const fs =require('fs')
const cors = require('cors');
const {pdfmerger} = require('./merge')
const port = 3000
app.use('/static', express.static('public'))
app.use(cors());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/PdfMerger/merge',upload.array('pdfs', 12), async (req, res, next)=>{
    console.log(req.files)
    try{
    if(req.files.length!==2){
            return res.send("You have to upload only two files")
    }
  
    let d;
    try{
     d = await pdfmerger(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path))
    }catch(error){
        return next(error);
    }
    req.files.forEach(file => {
        fs.unlinkSync(file.path);
    });
    res.redirect(`https://techiewrekie.github.io/PdfMerger/static/${d}.pdf`)
}catch(error){
    return next(error)
}
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

  
  

app.listen(port,()=>{
    console.log("The server is running on http://localhost:" + port)
})
