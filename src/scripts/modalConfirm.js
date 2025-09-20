export class ModalConfirm {
    constructor(){
        this.modal = document.createElement('div')
        this.modal.classList.add('modal', 'hidden')

        this.modal.innerHTML = `
            <div id="modalConfirm" class="modalContent">
                <h2 class="tituloModal">Confirmar?</h2>
                <span>
                    <input type="button" value="Cancelar" id="btnModalCancel" class="btnModal btnModalCancel">
                    <input type="button" value="Confirmar" id="btnModalConfirm" class="btnModal btnModalConfirm">
                </span>
            </div>
        `

        document.body.appendChild(this.modal)

        this.btnModalCancel = this.modal.querySelector('#btnModalCancel')
        this.btnModalConfirm = this.modal.querySelector('#btnModalConfirm')
    }

    mostrar(callback){
        this.modal.classList.remove('hidden')
        this.btnModalConfirm.onclick = ()=>{
            callback()
            this.#esconder()
        }
        this.btnModalCancel.onclick = ()=>{
            this.#esconder()
        }
    }

    #esconder(){
        this.modal.classList.add('hidden')
    }
}