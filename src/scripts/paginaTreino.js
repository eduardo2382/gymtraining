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
        database.atualizarTreino(treinoAtual.id, treinoAtual)
        atualizarExercicios()
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
        input.value = input.type == 'number' ? 0 : ""
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


function criarElementoExercicio(exercicio){
    let exercicioElemento = document.createElement('div')
    exercicioElemento.setAttribute('class', 'exercicio')

    exercicioElemento.innerHTML = `
         <div class="contentExercicio">
                    <span class="exercicioHeader">
                        <h2>${exercicio.nome}</h2>
                        <i class="ri-pencil-fill"></i>
                    </span>
                    <span class="exercicoInfos">
                        <div class="divInformacao">
                            <span class="infoTitulo">Séries</span>
                            <span class="serie info">${exercicio.series}</span>
                        </div>
                        <div class="divInformacao">
                            <span class="infoTitulo">Repetições</span>
                            <span class="repeticao info">${exercicio.repeticoes}</span>
                        </div>
                        <div class="divInformacao">
                            <span class="infoTitulo">Peso (kg)</span>
                            <span class="peso info">${exercicio.peso}</span>
                        </div>
                    </span>
                </div>
                <div class="editExercicio hidden">
                    <span class="editExercicioHeader">
                        <input type="text" id="inputNomeEditExercicio" placeholder="Nome do Exercicio:">
                        <span class="btnsEdit">
                            <i class="ri-delete-bin-fill btnEditDelete"></i>
                            <i class="ri-check-line btnEditConfirm"></i>
                        </span>
                    </span>
                    <span class="exercicoInfos">
                        <div class="divInformacao">
                            <span class="infoTitulo">Séries</span>
                            <input type="number" id="editSeries" onkeypress="return event.charCode >= 48 && event.charCode <= 57" oninput="event.target.value <0 ? event.target.value=0 : undefined" value="0">
                        </div>
                        <div class="divInformacao">
                            <span class="infoTitulo">Repetições</span>
                            <input type="number" id="editRepeticoes" onkeypress="return event.charCode >= 48 && event.charCode <= 57" oninput="event.target.value <0 ? event.target.value=0 : undefined" value="0">
                        </div>
                        <div class="divInformacao">
                            <span class="infoTitulo">Peso (kg)</span>
                            <input type="number" id="editPeso" onkeypress="return event.charCode >= 48 && event.charCode <= 57" oninput="event.target.value <0 ? event.target.value=0 : undefined" value="0">
                        </div>
                    </span>
                </div>
    `

    document.querySelector("#content").appendChild(exercicioElemento)

    return exercicioElemento
}



function atualizarExercicios(){
    let exercicios = treinoAtual.exercicios
    let semExercicio = document.querySelector('#semExercicio')
    document.querySelector("#content").innerHTML = ""

    if(exercicios.length > 0){
        exercicios.forEach((exercicio)=>{
            criarElementoExercicio(exercicio)
        })

        semExercicio.style.display = 'none'
        return
    }

    semExercicio.style.display = 'flex'
}

atualizarExercicios()