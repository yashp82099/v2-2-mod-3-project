// const body = document.querySelector('body')s

function selection(user){
 console.log(user)

    const selectionDiv = document.createElement('div')
    selectionDiv.id = 'selectionDiv'
    selectionDiv.textContent = 'hi'

    const blackJackImg = document.createElement('img')
    blackJackImg.src = 'Blackjack.png'
    blackJackImg.id = 'bjSelection'
    blackJackImg.addEventListener('click',(e) => {selectionDiv.remove()
        blackJack(user)
    })
    selectionDiv.appendChild(blackJackImg)



    body.appendChild(selectionDiv)






}