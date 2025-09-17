export class Treino {
    constructor(nome){
        this.nome = nome
        this.exercicios = []
        this.id = crypto.randomUUID();
    }

    /*
    novoExercicio(nome, series, repeticoes, peso){ 
        this.exercicios.push({
            id: randomUUID(),
            nome: nome,
            series: series,
            repeticoes: repeticoes,
            peso: peso
        })
    }
    */
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