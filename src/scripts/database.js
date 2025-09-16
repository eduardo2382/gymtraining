class Database {
    constructor(){
        if(localStorage.getItem('treinos')){
            this.storage = JSON.parse(localStorage.getItem('treinos'))
        }else {
            this.storage = localStorage.setItem('treinos',JSON.stringify([]))
        }
    }

    addTreino(treino){
        this.storage.push(treino)

        this.#updateDatabase()
    }

    #updateDatabase(){
        localStorage.setItem('treinos', JSON.stringify(this.storage))
    }
}