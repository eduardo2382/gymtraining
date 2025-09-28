let dragDrop = null

export function mapearDragDrop(elementoPai, classeElemFilho, callback){
    elementoPai.addEventListener('dragstart', dragStart)
    elementoPai.addEventListener('dragover', (event)=>{
        dragOver(event, classeElemFilho)
    })
    elementoPai.addEventListener('dragleave', (event)=>{
        dragLeave(event, classeElemFilho)
    })
    elementoPai.addEventListener('drop', (event)=>{
        drop(event, classeElemFilho, callback)
    })
}

export function dragStart(event){
    dragDrop = event.target        
    event.dataTransfer.effectAllowed = "move"
}

export function dragOver(event, classe){
    event.preventDefault()
    if(event.target.classList.contains(classe)){
        let elementoEmbaixo = event.target.getBoundingClientRect()
        
        if(event.clientY <= elementoEmbaixo.top+(elementoEmbaixo.height/2)){
            event.target.classList.add('destaqueTop')
            event.target.classList.remove('destaqueBottom')
        }else{
            event.target.classList.remove('destaqueTop')
            event.target.classList.add('destaqueBottom')
        }
    }
}

export function dragLeave(event, classe){
    if(event.target.classList.contains(classe)){
        event.target.classList.remove('destaqueTop')
        event.target.classList.remove('destaqueBottom')
    }
}

export function drop(event, classe, callback){
    event.preventDefault();
    let target = event.target

    if(target.classList.contains(classe)){
        let elementoEmbaixo = target.getBoundingClientRect()
        
        if(event.clientY <= elementoEmbaixo.top+(elementoEmbaixo.height/2)){
            target.insertAdjacentElement('beforebegin', dragDrop)
            event.target.classList.remove('destaqueTop')
            event.target.classList.remove('destaqueBottom')
        }else{
            target.insertAdjacentElement('afterend', dragDrop)
            event.target.classList.remove('destaqueTop')
            event.target.classList.remove('destaqueBottom')
        }
    }

    callback()
}