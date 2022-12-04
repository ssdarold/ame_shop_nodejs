const Picture = require('../models/models').Picture
const Picture_category = require('../models/models').Picture_category

exports.GetMain = (req, res) => {
    Picture_category.findAll({raw:true}).then(categories => {
        res.render('admin', {
            layout: "admin",
            pic_cat: categories
        })
    })
}

exports.GetCategories = function(req, res) {
        res.render('admin-pictures', {
            layout: "admin"
        })
}