const lists = document.querySelectorAll('.list')
const button = document.querySelector('.button')


function addTask() {
    const btn = document.querySelector('.add__bth')
    const addBtn = document.querySelector('.add__item-btn')
    const cancelBtn = document.querySelector('.cancel__item-btn')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')


    let value

    btn.addEventListener('click', () => {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'

        textarea.addEventListener('input', e => {
            value = e.target.value

            if (value) {
                addBtn.style.display = 'block'
            } else {
                addBtn.style.display = 'none'
            }
        })
    })



    cancelBtn.addEventListener('click', () => {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'

    })

    addBtn.addEventListener('click', () =>{
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value
        lists[0].append(newItem)

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'

        dargNdrop()
    })

}
addTask()

/////
function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML = `
            <input id="title" placeholder="Введите название" contenteditable="true" >
            <div class="list"></div>
    `
    boards.append(board)

    dargNdrop()
}

button.addEventListener('click', addBoard)
//
// for (let i = 0 ; i < button.length; i++) {
//     button[i].addEventListener('click' , addBoard , false ) ;
// }



let draggedItem = null

function dargNdrop() {
    const listItems = document.querySelectorAll('.list__item')
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i]

        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () =>{
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })

        item.addEventListener('dblclick', () =>{
            item.remove()
        })


        for (let j = 0; j < lists.length; j++) {
            const list = lists[j]

            list.addEventListener('dragover', e => e.preventDefault())


            list.addEventListener('dragover', function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgb(61, 21, 21)'
            })

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgb(169, 35, 35)'
            })

            list.addEventListener('drop', function (e){
                this.style.backgroundColor = 'rgb(169, 35, 35)'
                this.append(draggedItem)
            })


            function delBoard() {
                const boards = document.querySelectorAll('.boards__item')
                for (let i = 1; i < boards.length; i++) {
                    const board = boards[i]


                    //не работает при вынесении за цикл.
                    document.getElementsByClassName('boards__item')[0].style.marginLeft = "auto"
                    document.getElementsByClassName('boards__item')[0].style.marginRight = "auto"


                    document.getElementsByClassName('boards__item')[i].style.marginLeft = "auto"
                    document.getElementsByClassName('boards__item')[i].style.marginRight = "auto"


                    // board.addEventListener('dblclick', () => {
                    //     board.remove()
                    // })

                    board.addEventListener('click', function (evt) {
                        if (evt.detail === 3) {
                            board.remove()
                        }
                    })


                }
            }
            delBoard()


        }
    }
}
dargNdrop()

