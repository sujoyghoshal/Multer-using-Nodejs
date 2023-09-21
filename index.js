const express=require('express');
const app=express();
const port=process.env.port||3000;
const path=require('path');
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
//midllewere use
const multer = require('multer');
const uploadfile=multer({dest:'./public/files'});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/uploaded.html'));
})
app.post('/upload',uploadfile.single("pic"),(req,res)=>{
    //use a midlewere 
    res.send("File uploaded")
})
app.listen(port,()=>{
    console.log(`Running the port no ${port}`);
})