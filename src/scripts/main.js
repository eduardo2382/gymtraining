// importa as classes Treino e Database
import { Treino, elementoTreino } from './treino.js'
import { Database } from './database.js'
import { ModalConfirm } from './modalConfirm.js'
import { mapearDragDrop } from './dragDrop.js'

const database = new Database()

const modalConfirm = new ModalConfirm()

const btnNovoTreino = document.querySelector('#btnNovoTreino')
const content = document.querySelector('.content')

// quando o site inicia atualiza os card com o storage inicial do database
atualizarCardsTreino()

// quando clicado o botao aciona o modal passando uma funcao, essa funcao recebe o nome do novo treino e cria um objeto treino com esse nome, depois adiciona esse treino no database e atualiza os card de treinos no html
btnNovoTreino.onclick = ()=>{
    mostrarModalNovoTreino((nome)=>{
        let treino = new Treino(nome)
        database.adicionarTreino(treino)
        atualizarCardsTreino()
    })
}

mapearDragDrop(content, 'treino', ()=>{
    atualizarPosicoesTreinos()
})

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
    let elementoTreino = document.createElement('div')
    elementoTreino.id = treino.id
    elementoTreino.classList.add('treino')
    elementoTreino.innerHTML = `
        <span class="treinoHeader">
            <h2 class="nome">${treino.nome}</h2>
            <span class="btnsTreino">
                <i class="ri-pencil-fill btnEdit"></i>
                <i class="ri-arrow-up-s-line ordenarCima"></i>
                <i class="ri-arrow-down-s-line ordenarBaixo"></i>
            </span>
        </span>
        <span class="editTreino hidden">
            <input type="text" class="inputEditTreino" placeholder="Nome do Treino:">
            <span class="btnsEdit">
                <i class="ri-delete-bin-fill btnEditDelete"></i>
                <i class="ri-check-line btnEditConfirm"></i>
            </span>
        </span>
        <p class="quantidade">${treino.exercicios.length} exercicios</p>
    `

    document.querySelector('.content').appendChild(elementoTreino)


    let btnEdit = elementoTreino.querySelector('.btnEdit')
    let treinoHeader = elementoTreino.querySelector('.treinoHeader')
    let editTreino = elementoTreino.querySelector('.editTreino')
    let btnOrdemCima = elementoTreino.querySelector('.ordenarCima')
    let btnOrdemBaixo = elementoTreino.querySelector('.ordenarBaixo')

    elementoTreino.querySelector('.inputEditTreino').onclick = (event)=>{
        event.stopPropagation()
    }

    btnEdit.onclick = (event)=>{
        alternarHidden(treinoHeader)
        atualizarTreino(treino, editTreino, treinoHeader)
        event.stopPropagation()
    }

    btnOrdemCima.onclick = (event)=>{
        moverElemTreinos(elementoTreino, 'cima')
        event.stopPropagation()
    }

    btnOrdemBaixo.onclick = (event)=>{
        moverElemTreinos(elementoTreino, 'baixo')
        event.stopPropagation()
    }

    elementoTreino.addEventListener('click', (event)=>{
        atualizarTreinoAtual(treino.id)
        window.location.href = "./src/pages/paginatreino.html" 
    })
}

// atualiza os cards de treino de acordo com o storage do database
function atualizarCardsTreino(){
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
            treino.nome = inputEditTreino.value
            database.atualizarTreino(treino.id, treino)
            atualizarCardsTreino()
        }

        alternarHidden(editTreino)
        alternarHidden(treinoHeader)

        event.stopPropagation()
    }

    btnEditDelete.onclick = (event)=>{
        modalConfirm.mostrar(()=>{
            database.apagarTreino(treino.id)
            atualizarCardsTreino()
            alternarHidden(editTreino)
        })

        event.stopPropagation()
    }
}

function atualizarTreinoAtual(id){
    localStorage.setItem('treinoAtual', id)
}

function moverElemTreinos(elemento, direcao){
    let elemTreinos = Array.from(document.querySelectorAll('.treino'))
    let indice = elemTreinos.indexOf(elemento)

    if(direcao == 'cima' && indice!=0){
        elemTreinos.splice(indice-1, 0, elemento)
        elemTreinos.splice(indice+1, 1)
    }
    
    if(direcao == 'baixo'){
        elemTreinos.splice(indice, 1)
        elemTreinos.splice(indice+1, 0, elemento)
    }

    atualizarPosicoesTreinos(elemTreinos)
}

function atualizarPosicoesTreinos(elemTreinos){
    let posicoesTreinos = []

    elemTreinos.forEach((elemento)=>{
        posicoesTreinos.push(database.buscarTreino(elemento.id))
    })

    database.atualizarPosicoes(posicoesTreinos)
    atualizarCardsTreino()
}
