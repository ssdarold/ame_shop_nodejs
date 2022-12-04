const express = require("express")
const expressHbs = require("express-handlebars")
const hbs = require("hbs")
const session = require('express-session')
var crypto = require('crypto')
const app = express()
const SliderControllder = require('./controllers/SliderController')
const MainControllder = require('./controllers/MainController')
var bodyParser = require('body-parser')
const Slider = require('./models/models').Slider
const multer  = require("multer")
const PicturesCategoriesController = require('./controllers/PicturesCategoriesController')
const AdminController = require('./controllers/AdminController')
const PicturesController = require('./controllers/PicturesController')
const AdminPictureController = require('./controllers/AdminPictureController')
const MessagesController = require('./controllers/MessagesController')
const AdminMessagesController = require('./controllers/AdminMessagesController')
const GetSinglePicture = require('./controllers/PicturesController')
const UserController = require('./controllers/UserController')
const CommentsController = require('./controllers/CommentsController')

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.use(
    session({
      secret: 'ssdarold',
      saveUninitialized: true
    })
  )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "hbs")

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "assets/img/bg-img");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

app.use(multer({storage: storageConfig}).single("filedata"))
hbs.registerPartials(__dirname + "/views/partials");
app.use('/assets', express.static('assets'))
app.use((req, res, next) => {
        res.locals.isUserAuth = 'Шмаражиха'
        next()
})

// Роутинг

app.get('/', SliderControllder.GetSlides, PicturesCategoriesController.GetCategory, PicturesController.GetPicture, MainControllder.GetMainContent)

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/admin/messages', MessagesController.GetMessage, AdminMessagesController.GetMain)

app.post('/admin/messages', MessagesController.CreateMessage, (req, res) => {
    res.redirect('back')
})

app.post('/login', UserController.LoginUser)

app.get('/login', (req, res) => {
    if(req.session.user) {
        res.redirect('/users/' + req.session.user.id)
    }
    else{
        res.render('login', {
            source: req.query.commentpicture
        })
    }
})

app.get('/register', (req, res) => {
    if(req.session.user) {
        res.redirect('/users/' + req.session.user.id)
    }
    else{
        res.render('register', {
            source: req.query.commentpicture
        })
    }
})

app.post('/comments', CommentsController.AddComment)

app.post('/register', UserController.CreateUser)

app.get('/users/:userid', UserController.isAuth, UserController.GetSingleUser)

app.get('/logout', UserController.Logout)

app.get('/pictures', (req, res) => {
    res.render('pictures')
})

app.get('/pictures-categories', (req, res) => {
    res.render('pictures')
})

app.post('/users/changeavatar', UserController.ChangeAvatar)

app.get('/pictures/:slug', UserController.isAuth, PicturesController.GetSinglePicture, CommentsController.GetComments, PicturesController.RenderSinglePicture)


app.get('/cards', (req, res) => {
    res.render('cards')
})

app.get('/contacts', (req, res) => {
    res.render('contacts')
})

app.get('/admin/pictures', PicturesCategoriesController.GetCategory,  AdminPictureController.GetMain)

app.get('/admin', UserController.AdminAuth, AdminController.GetMain)

app.post('/slider', SliderControllder.CreateSlider)

app.post('/admin/pictures-categories', PicturesCategoriesController.CreateCategory)

app.post('/admin/pictures', PicturesController.CreatePicture)

app.get('/get-pictures', PicturesController.GetPicture)

// app.post('/pictures', (req, res) => {
//     console.log(req.body.pic_category)
// })

app.listen(8080)