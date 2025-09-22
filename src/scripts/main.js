// importa as classes Treino e Database
import { Treino } from './treino.js'
import { Database } from './database.js'
import { elementoTreino } from './elementoTreino.js'
import { ModalConfirm } from './modalConfirm.js'

const database = new Database()

const modalConfirm = new ModalConfirm()

const btnNovoTreino = document.querySelector('#btnNovoTreino')

// quando o site inicia atualiza os card com o storage inicial do database
atualizarCards()

// quando clicado o botao aciona o modal passando uma funcao, essa funcao recebe o nome do novo treino e cria um objeto treino com esse nome, depois adiciona esse treino no database e atualiza os card de treinos no html
btnNovoTreino.onclick = ()=>{
    mostrarModalNovoTreino((nome)=>{
        let treino = new Treino(nome)
        database.adicionarTreino(treino)
        atualizarCards()
    })
}

// verifica se o input tem dado de entrada valido
function validarInput(input){
    if(typeof input.value === 'string' && input.value.length > 0){
        return true
    } else{
        return false
    }
}


// mostra o modal na tela, quando o btn salvar é acionado pega o nome no input e passa para a funcao callback
function mostrarModalNovoTreino(callback){
    let modalNovoTreino = document.querySelector('.modal')
    let btnCancelarNovoTreino = document.querySelector('#btnCancelarNovoTreino')
    let btnSalvarNovoTreino = document.querySelector('#btnSalvarNovoTreino')
    let inputNovoTreino = document.querySelector('#inputNovoTreino')

    alternarHidden(modalNovoTreino)

    btnSalvarNovoTreino.onclick = ()=>{
        if(validarInput(inputNovoTreino)){
            callback(inputNovoTreino.value)
            inputNovoTreino.value = ''
            alternarHidden(modalNovoTreino)
        }
    }

    btnCancelarNovoTreino.onclick = ()=>{
        inputNovoTreino.value = ''
        alternarHidden(modalNovoTreino)
    }
}


// funcao para esconder e mostrar algum elemento
function alternarHidden(elem){ 
    elem.classList.toggle('hidden')
}

// cria o elemento html card de cada treino
function criarElementoTreino(treino){
    let elemento = elementoTreino(treino)
    let btnEdit = elemento.querySelector('.btnEdit')
    let treinoHeader = elemento.querySelector('.treinoHeader')
    let editTreino = elemento.querySelector('.editTreino')

    elemento.addEventListener('click', ()=>{
        window.location.href = "/src/pages/exercicio.html"
    })

    btnEdit.onclick = (event)=>{
        alternarHidden(treinoHeader)
        atualizarTreino(treino, editTreino, treinoHeader)
        event.stopPropagation()
    }
}

// atualiza os cards de treino de acordo com o storage do database
function atualizarCards(){
    let treinos = database.lerTreinos()
    let semTreino = document.querySelector('#semTreino')
    let content = document.querySelector('.content')
    content.innerHTML = ''
    

    if(treinos.length > 0){
        treinos.forEach((treino)=>{
            criarElementoTreino(treino)
        })

        semTreino.style.display = 'none'
    }else{
        semTreino.style.display = 'flex'
    }
}

function atualizarTreino(treino, editTreino, treinoHeader){
    let inputEditTreino = editTreino.querySelector('.inputEditTreino')
    inputEditTreino.value = treino.nome
    let btnEditDelete = editTreino.querySelector('.btnEditDelete')
    let btnEditConfirm = editTreino.querySelector('.btnEditConfirm')

    alternarHidden(editTreino)

    btnEditConfirm.onclick = (event)=>{
        if(validarInput(inputEditTreino) && inputEditTreino.value != treino.nome){
            database.atualizarTreino(treino.id, inputEditTreino.value)
            atualizarCards()
        }

        alternarHidden(editTreino)
        alternarHidden(treinoHeader)

        event.stopPropagation()
    }

    btnEditDelete.onclick = (event)=>{
        modalConfirm.mostrar(()=>{
            database.apagarTreino(treino.id)
            atualizarCards()
            alternarHidden(editTreino)
        })

        event.stopPropagation()
    }
}






