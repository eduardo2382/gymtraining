export class Treino {
    constructor(nome){
        this.nome = nome
        this.exercicios = []
        this.id = crypto.randomUUID();
    }

    novoExercicio(nome, series, repeticoes, peso){ 
        this.exercicios.push({
            id: randomUUID(),
            nome: nome,
            series: series,
            repeticoes: repeticoes,
            peso: peso
        })
    }
}

/*
{
    nome : ;
    id: ;
    series: ;
    repeticoes: ;
    peso: ;
}
*/

export function elementoTreino(treino){
    let divTreino = document.createElement('div')
    divTreino.setAttribute('class', 'treino')


    let treinoHeader = document.createElement('span')
    treinoHeader.setAttribute('class', 'treinoHeader')

    let nomeTreino = document.createElement('h2')
    nomeTreino.setAttribute('class', 'nome')
    nomeTreino.innerText = treino.nome
    let btnEdit = document.createElement('i')
    btnEdit.setAttribute('class', 'ri-pencil-fill btnEdit')

    treinoHeader.appendChild(nomeTreino)
    treinoHeader.appendChild(btnEdit)


    let editTreino = document.createElement('span')
    editTreino.setAttribute('class', 'editTreino hidden')

    let inputEditTreino = document.createElement('input')
    inputEditTreino.setAttribute('type', 'text')
    inputEditTreino.setAttribute('class', 'inputEditTreino')
    inputEditTreino.setAttribute('placeholder', 'Nome do Treino:')
    inputEditTreino.onclick = (event)=>{
        event.stopPropagation()
    }

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

    return divTreino
}