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

        this.#updateDatabase()
    }

    lerTreinos(){
        return this.storage
    }

    #updateDatabase(){
        localStorage.setItem('treinos', JSON.stringify(this.storage))
    }
}