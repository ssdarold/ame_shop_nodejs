let date = document.querySelectorAll('.comment_date')

// console.log(date[1].innerText)

for(let i = 0; i<date.length; i++){
    let datavalue = date[i].innerText
    let res = datavalue.split(' ')
// console.log(res[4])

let month = res[1]
let day = res[2]
let year = res[3]
let time = res[4]

let res_month

switch(month) {
    case 'JAN':
        res_month = 01
    break;
    case 'FEB':
        res_month = 02
    break;
    case 'MAR':
        res_month = 03
    break;
    case 'APR':
        res_month = 04
    break;
    case 'MAY':
        res_month = 05
    break;
    case 'JUN':
        res_month = 06
    break;
    case 'JUL':
        res_month = 07
    break;
    case 'AUG':
        res_month = 08
    break;
    case 'SEP':
        res_month = 09
    break;
    case 'OCT':
        res_month = 10
    break;
    case 'NOV':
        res_month = 11
    break;
    case 'DEC':
        res_month = 12
    break;
}

let comment_date = `${day}.${res_month}.${year} ${time}`
date[i].innerHTML = comment_date
// console.log(comment_date)
}

// // console.log(comment_date)