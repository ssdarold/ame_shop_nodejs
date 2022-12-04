exports.GetMainContent = function(req, res) {
   res.render('main', {
    slider: res.locals.slides,
    pic_cat: res.locals.categories,
    pictures: res.locals.pictures
   })
}