import { Treino } from './treino.js'
import { Database } from './database.js'

const database = new Database()

const btnNovoTreino = document.querySelector('#btnNovoTreino')
const modalNovoTreino = document.querySelector('.modalNovoTreino')
const btnCancelarTreino = document.querySelector('#btnCancelarTreino')
const btnSalvarTreino = document.querySelector('#btnSalvarTreino')
const inputTreino = document.querySelector('#inputTreino')

atualizarCards()


btnNovoTreino.addEventListener('click', ()=>{
    alternarVisivel(modalNovoTreino)
})

btnCancelarTreino.addEventListener('click', ()=>{
    alternarVisivel(modalNovoTreino)
    inputTreino.value = ""
})

btnSalvarTreino.addEventListener('click', ()=>{
    if(inputTreino.value.length > 0){
        let treino = new Treino(inputTreino.value)
        database.addTreino(treino)
        atualizarCards()
        alternarVisivel(modalNovoTreino)
        inputTreino.value = ""
    }
})

function alternarVisivel(elem){
    elem.classList.toggle('hidden')
}

function criarCard(treino){
    let divTreino = document.createElement('div')
    divTreino.setAttribute('class', 'treino')

    let treinoHeader = document.createElement('span')
    treinoHeader.setAttribute('class', 'treinoHeader')

    let nomeTreino = document.createElement('h2')
    nomeTreino.setAttribute('class', 'nome')
    nomeTreino.innerText = treino.nome
    let iconMore = document.createElement('i')
    iconMore.setAttribute('class', 'ri-more-fill')

    treinoHeader.appendChild(nomeTreino)
    treinoHeader.appendChild(iconMore)

    let quantidade = document.createElement('span')
    quantidade.setAttribute('class', 'quantidade')
    quantidade.innerText = `${treino.exercicios.length} exercicios`

    divTreino.appendChild(treinoHeader)
    divTreino.appendChild(quantidade)

    document.querySelector('.content').appendChild(divTreino)
}

function atualizarCards(){
    let treinos = database.storage
    let semTreino = document.querySelector('#semTreino')
    let content = document.querySelector('.content')
    content.innerHTML = ''
    

    if(treinos.length > 0){
        treinos.forEach((treino)=>{
            criarCard(treino)
        })

        semTreino.style.display = 'none'
    }else{
        semTreino.style.display = 'flex'
    }
}
