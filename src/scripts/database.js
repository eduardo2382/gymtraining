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

    buscarTreino(id){
        for (let i = 0; i < this.storage.length; i++) {
            const treino = this.storage[i];

            if(treino.id == id){
                return treino
            }
        }
    }

    atualizarTreino(id, novoNome){
        this.storage.forEach((treino)=>{
            if(treino.id == id){
                treino.nome = novoNome
                this.#atualizarDatabase()
            }
        })
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