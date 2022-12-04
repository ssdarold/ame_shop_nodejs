const User = require('../models/models').User
var crypto = require('crypto')


exports.CreateUser = (req, res) => {
    User.findOne({
        where: {
            user_name: req.body.username
        }
    }).then(user => {
        if(user) {
            res.render('register', {
                loginerror: true,
                error_message: "Пользователь с таким именем уже зарегистрирован"
            })
        }
        else {
            User.create({
                user_name: req.body.username,
                user_password: hash(req.body.password),
                user_role: "2",
                user_avatar: "user_avatar.png"
            }).then( function() {
                User.findOne({
                    where: {
                        user_name: req.body.username
                    }
                }).then(new_user => {
                    req.session.user = {name: new_user.user_name, role: new_user.user_role, id: new_user.id}
                    if(req.body.source) {
                        res.redirect('/pictures/' + req.body.source + '#leave_comment')
                    }
                    else{
                        res.redirect('/users/' + new_user.id)
                    }
                })
            })
        }
    })
}

exports.LoginUser = (req, res, next) => {
    User.findOne({where: {
        user_name: req.body.username}
    }).then(user => {
        if(user) {
            if(hash(req.body.password) == user.user_password) {
                req.session.user = {name: user.user_name, role: user.user_role, id: user.id}
                if(req.session.user.role == 1) {
                    res.redirect('/admin')
                }
                else {
                    if(req.body.source) {
                        res.redirect('/pictures/' + req.body.source + '#leave_comment')
                    }
                    else{
                        res.redirect('/users/' + req.session.user.id)
                    }
                }
            }
            else {
                res.render("login", {
                    loginerror: true,
                    error_message: "Неправильный пароль"
                })
            }
        }
        else {
            res.render("login", {
                loginerror: true,
                error_message: "Пользователь с таким именем не зарегистрирован"
            }) 
        }
    })
}

exports.GetSingleUser = (req, res) => {
        if(req.session.user.id == req.params.userid) {
            User.findOne({
                where: {
                    id: req.params.userid
                }
            }).then(single_user => {
                res.render('user_page', {
                    user_data: single_user
                })
                // console.log(single_user)
            })
        }
        else{
            res.render('forbidden')
        }
}

exports.isAuth = (req, res, next) => {
    if(req.session.user) {
        res.locals.auth = true
        res.locals.userdata = req.session.user
        next()
    }
    else {
        res.locals.auth = false
        next()
    }
}

// Смена аватары

exports.ChangeAvatar = (req, res, next) => {
    let filedata = req.file

    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
    try {
        User.update(
            {user_avatar: filedata.originalname},
            {where: {id: req.session.user.id}}
        ).then(result => {
            res.redirect('back')
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.AdminAuth = (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.role == 1) {
            res.locals.admin = true
            next()
        }
        else {
            res.render('forbidden')
        }
    }
    else{
        res.redirect("/login") 
    }
}

exports.Logout = (req, res) => {
    if (req.session.user) {
        delete req.session.user
        res.redirect('/')
        }
}

function hash(text) {
    return crypto.createHash('sha1')
    .update(text).digest('base64')
   }