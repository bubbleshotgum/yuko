import * as collection from './1.json' assert { type: 'json' }
const coll = collection.default

document.getElementById('start').onclick = () => {
    const audio = new Audio("./media/audio/welcome.mp3")
    audio.play()
    audio.onended = () => {audio.play()}

    let cnt = 0,
        active = 0
    for(const i in coll) {
        const clone = document.getElementById('task').content.cloneNode(true)
        clone.querySelector('div.upper-section p.sentence').innerHTML = i.replace(/______/g, '<div class="sensible-field">______</div>')
        clone.querySelector('div.upper-section p.score').textContent = `${cnt + 1} out of ${Object.keys(coll).length}`
        const dragSection = clone.querySelector('div.lower-section')
        for(let j = 0; j < coll[i][0].length; j++) {
            dragSection.appendChild(document.getElementById('draggable-div').content.cloneNode(true))

            const currentChild = Array.from(dragSection.children).at(-1)
            currentChild.textContent = coll[i][0][j]
            currentChild.style.top =
            Math.floor(window.innerHeight / 2
            + Math.random() * window.innerHeight / 2
            - 24) + 'px'
            currentChild.style.left =
            Math.max(12, Math.floor(Math.random() * window.innerWidth
            - 72)) + 'px'

            // const currentCnt = cnt
            currentChild.addEventListener('dragstart', e => {e.dataTransfer.setDragImage(new Image(), 0, 0)})
            
              
            currentChild.addEventListener('drag', e => {
                if(e.clientY)
                    currentChild.style.top = (e.clientY - currentChild.offsetHeight / 2) + 'px'
                if(e.clientX)
                    currentChild.style.left = (e.clientX - currentChild.offsetWidth / 2) + 'px'

                const elems = Array.from(document.getElementsByClassName('task')[active].querySelector('div.upper-section > p.sentence').getElementsByClassName('sensible-field')).filter(item => 
                    item.getBoundingClientRect().bottom > currentChild.getBoundingClientRect().top && (
                        item.getBoundingClientRect().left < currentChild.getBoundingClientRect().right 
                    &&  item.getBoundingClientRect().right > currentChild.getBoundingClientRect().left 
                    || 
                        currentChild.getBoundingClientRect().left < item.getBoundingClientRect().right 
                    &&  currentChild.getBoundingClientRect().right > item.getBoundingClientRect().left 
                ))
                if(elems.length > 0) {
                    if(Object.values(coll)[active][1].includes(currentChild.textContent)) {
                        currentChild.style.color = 'green'
                        if(active + 1 < Object.keys(coll).length)
                            document.getElementsByClassName('task')[active].querySelector('div.upper-section button').style.display = 'block'
                    } else
                        currentChild.style.color = 'red'
                }
            })
        }
        const currentCnt = cnt
        document.getElementById('content').appendChild(clone)
        const currentChild = Array.from(document.getElementById('content').children).at(-1)
        currentChild.querySelector('div.upper-section button').onclick = () => {
            if(currentCnt + 1 < Object.keys(coll).length) {
                Array.from(document.getElementsByClassName('task'))[currentCnt].style.display = 'none'
                Array.from(document.getElementsByClassName('task'))[currentCnt + 1].style.display = 'block'
            }
            active++
        }
        if(cnt > 0)
            currentChild.style.display = 'none'
        cnt++
    }
}