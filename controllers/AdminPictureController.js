const Picture = require('../models/models').Picture

exports.GetMain = (req, res) => {
    res.render('admin-pictures', {
        layout: "admin",
        pic_cat: res.locals.categories
    })
}

// exports.GetMain = (req, res) => {
//     console.log('=============================================')
//     if(!res.locals.categories){
//         console.log('Нет ничо в этой твоей переменной')
//     }
//     else{
//         console.log(res.locals.categories)
//     }
// }