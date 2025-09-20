export class Database {
    constructor(){
        if(localStorage.getItem('treinos')){
            this.storage = JSON.parse(localStorage.getItem('treinos'))
        }else {
            this.storage = localStorage.setItem('treinos',JSON.stringify([]))
        }
    }

    adicionarTreino(treino){
        this.storage.push(treino)

        this.#atualizarDatabase()
    }

    lerTreinos(){
        return this.storage
    }

    atualizarTreino(){

    }

    apagarTreino(id){   
        this.storage = this.storage.filter((treino)=>{
            return treino.id != id
        })

        this.#atualizarDatabase()
    }

    #atualizarDatabase(){
        localStorage.setItem('treinos', JSON.stringify(this.storage))
    }
}