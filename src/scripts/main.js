const btnNovoTreino = document.querySelector('#btnNovoTreino')
const modalContainer = document.querySelector('.modalContainer')
const btnCancelarTreino = document.querySelector('#btnCancelarTreino')
const btnSalvarTreino = document.querySelector('#btnSalvarTreino')
const inputTreino = document.querySelector('#inputTreino')


btnNovoTreino.addEventListener('click', ()=>{
    alternarVisivel(modalContainer)
})

btnCancelarTreino.addEventListener('click', ()=>{
    alternarVisivel(modalContainer)
    inputTreino.value = ""
})

btnSalvarTreino.addEventListener('click', ()=>{
    alternarVisivel(modalContainer)
    inputTreino.value = ""
})

function alternarVisivel(elem){
    elem.classList.toggle('hidden')
}