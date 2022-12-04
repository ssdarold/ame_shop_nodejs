const transliterate = require('transliterate-cyrillic-text-to-latin-url');
const Picture = require('../models/models').Picture
const Picture_category = require('../models/models').Picture_category
// const picturecategoriesunion = require('../models/models')
const User = require('../models/models').User
   
exports.CreatePicture = async function(req, res) {
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        console.log("Файл загружен");
    try {
        const newPic = await Picture.create({
    picture_image: filedata.originalname,
    picture_header: req.body.picture_header,
    picture_description: req.body.picture_description,
    picture_price: req.body.picture_price,
    picture_slug: transliterate(req.body.picture_header)
            })
        console.log("Картина успешно добавлена!")
    let newpicCategories = req.body.pic_category
    let PicCat
    newpicCategories.forEach(async (category) => {
        PicCat = await Picture_category.findOne({where: {picture_category_slug: category}})
        newPic.addPicture_category(PicCat)
    })
    res.redirect('/admin/pictures')
    }
    catch (err) {
        console.log(err)
    }
        }

exports.GetPicture = (req, res, next) => {
    Picture.findAll({include: Picture_category}).then(pictures => {
        res.locals.pictures = pictures
        next()
        // console.log(JSON.stringify(pictures, null, 2))
    })
}

exports.GetSinglePicture = (req, res, next) => {
        // res.render('single-picture', {
        //     single_picture: res.locals.picture,
        //     user_auth: res.locals.auth,
        //     user_data: res.locals.userdata
        // })
        Picture.findOne({
            where: {
                picture_slug: req.params.slug
            }
        }).then(picture => {
            res.locals.singlepic = picture
            next()
        })
        
}

exports.RenderSinglePicture = (req, res) => {
        res.render('single-picture', {
            single_picture: res.locals.singlepic,
            is_auth: res.locals.auth,
            picture_comment: res.locals.comments,
            user_data: res.locals.userdata
        })
    // console.log(JSON.stringify(res.locals.comments, null, 2))
}