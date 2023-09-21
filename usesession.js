const express = require('express');
const app = express();
const port = process.env.port || 9000;
const path = require('path');
const cookieparser = require('cookie-parser');
const session = require('express-session');
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
const oneday = 1000 * 60 * 60 * 24;
app.use(session({
    saveUninitialized: true,
    secret: 'wde3481v@#ef',
    resave: false,
    cookie: { maxAge: oneday }
}))
//midllewere use
const multer = require('multer');
const mstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files');
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = file.mimetype.split('/')[1]
        cb(null, req.session.username + '.' + ext);
    }
})
//filter use
const filter = (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if (ext == 'png') {
        cb(null, true);
    }
    else {
        cb(new Error("File not supportrd"), false);
    }
}
const fileupload = multer({ storage: mstorage, fileFilter: filter });
// store in multer 
app.post('/upload', fileupload.single('pic'), (req, res) => {
    res.redirect('/dashboard');
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'));
})
app.post('/login', (req, res) => {
    if (req.body.username == req.body.password) {
        req.session.username = req.body.username;
        res.redirect('/dashboard');
    }
    else {
        res.redirect('/login');
    }
})
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, './public/dashboard.html'));
})
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})
app.listen(port, () => {
    console.log(`Running the port no ${port}`);
})