import { Database } from "./database.js"
import { Exercicio } from "./exercicio.js"

const database = new Database()
var treinoAtual = database.buscarTreino(localStorage.getItem('treinoAtual'))

const tituloTreino = document.querySelector('#contentHeader h1')
tituloTreino.innerText = treinoAtual.nome
const btnCriarExercicio = document.querySelector("#btnCriarExercicio")


btnCriarExercicio.addEventListener('click', ()=>{
    mostrarModalNovoExercicio((nome, series, repeticoes, peso)=>{
        let exercicio = new Exercicio(nome, series, repeticoes, peso)
        treinoAtual.exercicios.push(exercicio)
        console.log(treinoAtual)
        database.atualizarTreino(treinoAtual.id, treinoAtual)
    })
})

function alternarVisivel(elemento){
    elemento.classList.toggle('hidden')
}

function validarInput(inputs){
    return inputs.every((input)=>{
        let type = input.type
        let value = input.value

        if(value.length>0){
            return true
        }

        return false
    })
}

function limparInput(inputs){
    inputs.forEach((input)=>{
        input.value = ""
    })
}

function mostrarModalNovoExercicio(callback){
    let modal = document.querySelector('.modal')
    let btnSalvar = document.querySelector('#btnSalvarNovoExercicio')
    let btnCancelar = document.querySelector('#btnCancelarNovoExercicio')
    let inputNome = document.querySelector('#inputNomeNovoExercicio')
    let inputSeries = document.querySelector('#seriesNovoExercicio')
    let inputRepeticoes = document.querySelector('#repeticoesNovoExercicio')
    let inputPeso = document.querySelector('#pesoNovoExercicio')

    alternarVisivel(modal)

    btnSalvar.onclick = ()=>{
        if(validarInput([inputNome, inputSeries, inputRepeticoes, inputPeso])){
            callback(inputNome.value, inputSeries.value, inputRepeticoes.value, inputPeso.value)
            limparInput([inputNome, inputSeries, inputRepeticoes, inputPeso])
            alternarVisivel(modal)
        }
    }

    btnCancelar.onclick = ()=>{
        limparInput([inputNome, inputSeries, inputRepeticoes, inputPeso])
        alternarVisivel(modal)
    }
}