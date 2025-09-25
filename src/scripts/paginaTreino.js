import { Database } from "./database.js"

const database = new Database()

var treinoAtual = database.buscarTreino(localStorage.getItem('treinoAtual'))