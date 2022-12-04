exports.GetMain = (req, res) => {
    res.render('admin-messages', {
        messages: res.locals.messages,
        layout: 'admin'
    })
}