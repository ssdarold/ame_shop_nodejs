const translit = require('../node_modules/transliterate-cyrillic-text-to-latin-url')
const Picture_category = require('../models/models').Picture_category
   
exports.CreateCategory = function(req, res) {
    try {
    Picture_category.create({
        picture_category_name: req.body.picture_category_name,
        picture_category_slug: translit(req.body.picture_category_name)
            }).then(categories => {
                console.log(categories)
        res.redirect('/admin')
            })
        }
    catch (err) {
        console.log(err)
    }
        }

exports.GetCategory = (req, res, next) => {
    try{
        Picture_category.findAll({raw: true}).then(categories => {
            res.locals.categories = categories
            next()
        })
        
    }
    catch (err) {
        console.log(err)
    }
}