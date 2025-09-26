export class Exercicio {
    constructor(nome, series, repeticoes, peso){
        this.id = crypto.randomUUID()
        this.nome = nome
        this.series = series
        this.repeticoes = repeticoes
        this.peso = peso
    }
}