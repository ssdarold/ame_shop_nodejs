const Message = require('../models/models').Message

exports.CreateMessage = (req, res, next) => {
    Message.create({
        sender_name: req.body.message_name,
        sender_email: req.body.message_email,
        message_text: req.body.message,
        message_readed: false
    })
    next()
}

exports.GetMessage = (req, res, next) => {
    Message.findAll({raw:true}).then(messages => {
        res.locals.messages = messages
        next()
    })
}