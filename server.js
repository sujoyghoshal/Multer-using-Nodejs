const express=require('express');
const app=express();
const port=process.env.port||4000;
const path=require('path');
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
//midllewere use
const multer = require('multer');
const mstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/files');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        const ext=file.mimetype.split('/')[1]
        cb(null,'test.'+ext );
    }
})
 //filter use
const filter=(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    if(ext=='png'){
        cb(null,true);
    }
    else{
        cb(new Error("File not supportrd"),false);
    }
}
const fileupload=multer({storage:mstorage,fileFilter:filter});
// store in multer 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/uploaded.html'));
})
app.post('/upload',fileupload.single('pic'),(req,res)=>{
    res.end();
})
app.listen(port,()=>{
    console.log(`Running the port no ${port}`);
})