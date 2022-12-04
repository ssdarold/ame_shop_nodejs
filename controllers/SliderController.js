const Slider = require('../models/models').Slider
   
exports.CreateSlider = function(req, res) {
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
    try {
Slider.create({
    slider_picture: filedata.originalname,
    slider_header: req.body.slider_header,
    slider_description: req.body.slider_description
            })
        console.log("Слайд успешно добавлен!")
    }
    catch (err) {
        console.log(err)
    }
        }

exports.GetSlides = (req, res, next) => {
    Slider.findAll({raw:true}).then(slides => {
        res.locals.slides = slides
        next()
    })
}