// importa as classes Treino e Database
import { Treino } from './treino.js'
import { Database } from './database.js'

const database = new Database()

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
    let modalNovoTreino = document.querySelector('.modalNovoTreino')
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
function criarCard(treino){
    let divTreino = document.createElement('div')
    divTreino.setAttribute('class', 'treino')


    let treinoHeader = document.createElement('span')
    treinoHeader.setAttribute('class', 'treinoHeader')

    let nomeTreino = document.createElement('h2')
    nomeTreino.setAttribute('class', 'nome')
    nomeTreino.innerText = treino.nome
    let iconEdit = document.createElement('i')
    iconEdit.setAttribute('class', 'ri-pencil-fill')

    treinoHeader.appendChild(nomeTreino)
    treinoHeader.appendChild(iconEdit)


    let editTreino = document.createElement('span')
    editTreino.setAttribute('class', 'editTreino hidden')

    let inputEditTreino = document.createElement('input')
    inputEditTreino.setAttribute('type', 'text')
    inputEditTreino.setAttribute('class', 'inputEditTreino')
    inputEditTreino.setAttribute('placeholder', 'Nome do Treino:')

    let btnsEdit = document.createElement('span')
    btnsEdit.setAttribute('class', 'btnsEdit')

    let btnEditDelete = document.createElement('i')
    btnEditDelete.setAttribute('class', 'ri-delete-bin-fill btnEditDelete')

    let btnEditConfirm = document.createElement('i')
    btnEditConfirm.setAttribute('class', 'ri-check-line btnEditConfirm')

    btnsEdit.appendChild(btnEditDelete)
    btnsEdit.appendChild(btnEditConfirm)
    editTreino.appendChild(inputEditTreino)
    editTreino.appendChild(btnsEdit)


    let quantidade = document.createElement('span')
    quantidade.setAttribute('class', 'quantidade')
    quantidade.innerText = `${treino.exercicios.length} exercicios`

    divTreino.appendChild(treinoHeader)
    divTreino.appendChild(editTreino)
    divTreino.appendChild(quantidade)

    document.querySelector('.content').appendChild(divTreino)

    iconEdit.onclick = ()=>{
        alternarHidden(treinoHeader)
        atualizarTreino(treino.nome,editTreino, (novoNomeTreino)=>{
            console.log(novoNomeTreino)
            alternarHidden(treinoHeader)
        })
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
            criarCard(treino)
        })

        semTreino.style.display = 'none'
    }else{
        semTreino.style.display = 'flex'
    }
}

function atualizarTreino(treino, editTreino, callback){
    let inputEditTreino = editTreino.querySelector('.inputEditTreino')
    inputEditTreino.value = nomeAtual
    let btnEditDelete = editTreino.querySelector('.btnEditDelete')
    let btnEditConfirm = editTreino.querySelector('.btnEditConfirm')

    alternarHidden(editTreino)

    btnEditConfirm.onclick = ()=>{
        if(validarInput(inputEditTreino)){
            callback(inputEditTreino.value)
            alternarHidden(editTreino)
        }
    }

    btnEditDelete.onclick = ()=>{
        callback(undefined)
        alternarHidden(editTreino)
    }
}





