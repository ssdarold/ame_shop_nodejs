const Comment = require('../models/models').Comment
const Picture = require('../models/models').Picture
const User = require('../models/models').User

exports.GetComments = (req, res, next) => {
    Comment.findAll({
        where: {
            PictureId: res.locals.singlepic.id
        },
        include: User
    }).then(comments => {
        res.locals.comments = comments
        next()
    })
}

exports.AddComment = (req, res) => {
    Comment.create({
        comment_text: req.body.message,
        parent_id: req.body.parentid,
        PictureId: req.body.pictureid,
        UserId: req.body.userid
    }).then(comment => {
        res.redirect('back')
    })
    // console.log(req.body.pictureid)
}