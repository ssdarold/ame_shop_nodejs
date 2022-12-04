let comment = document.querySelectorAll('.single_comment_area')
let comment_count = document.getElementById('comment_count')

        
        for(let i = 0; i<comment.length; i++) {
            let comentId = comment[i].getAttribute('id')
            let childComment = comment[i].querySelector('ol')
            for(let g = 0; g<comment.length; g++){
                let commentParent = comment[g].getAttribute('data-parent')
                if(commentParent == comentId){
                    childComment.appendChild(comment[g])
                }
            }
        }

let number = comment.length;
let array = (""+number).split("").map(Number)
let secondlast = array[array.length - 2]
let last = array[array.length - 1]
let description
let zero

function Calc() {
    if(secondlast == 1) {
        // if(last >= 1 && last <= 5) {
        //     description = "комментариев"
        // }

        if(last >= 0 && last <= 9) {
            description = "комментариев"
            zero = ""
        }
    }
    else {
        if(last >= 2 && last <= 4) {
            description = "комментария"
            zero = ""
        }
        else if(last == 1){
            description = "комментарий"
            zero = ""
        }
        else if(last == 0){
            description = "комментариев"
            zero = ""
        }
        else if(last >= 5 && last <= 9){
            description = "комментариев"
            zero = ""
        }
        // description = "баребух енотских"
    }

    if(!secondlast){
        zero = 0
    }
    
    
    let result = `${zero}${number} ${description}`
    comment_count.innerHTML = result
}

Calc()

// if(secondlast == 0 | !secondlast && last == 2){
//     description = "комментария"
// }
// else if(secondlast == 1 && last >= 1 && last <= 5) {
//     description = "комментариев"
// }
// else if(last == 1) {
//     description = "комментарий"
// }
// else if(last >= 2 && last <= 4) {
//     description = "комментария"
// }
// else if(last == 0 && last >= 5 && last <= 9) {
//     description = "комментариев"
// }
