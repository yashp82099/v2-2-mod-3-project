// const body = document.querySelector('body')s

function selection(user){
 console.log(user)

    const selectionDiv = document.createElement('div')
    selectionDiv.id = 'selectionDiv'
    selectionDiv.textContent = 'hi'

    const blackJackImg = document.createElement('img')
    blackJackImg.src = 'Blackjack.png'
    blackJackImg.id = 'bjSelection'
    blackJackImg.addEventListener('click',(e) => { //selectionDiv.remove()
        // blackJack(user)
        console.log(e.target);
        console.log(user.user_games)
        let blackJackGames = user.user_games.filter(game => game.game_id === 2)
        console.log(blackJackGames);
        let checkUser = blackJackGames.find(game => game.user_id === user.id )
        console.log(checkUser);
        if(checkUser){
            console.log(`######################find`);
            selectionDiv.remove()
            blackJack(user, checkUser)
        }else{
            console.log(`######################create`);
            
            fetch('http://localhost:3000/user_games',{
                method: 'POST',
                headers: {
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({user_id: user.id, game_id:2, score:0})
            }).then(res => res.json()).then(userGame => {
                selectionDiv.remove()
                blackJack(user, userGame)})
        }
        
        
    })
    selectionDiv.appendChild(blackJackImg)


    const deleteBtn = document.createElement('h1')
    deleteBtn.textContent = 'DELETE'
    deleteBtn.id = 'deleteBtn'
    deleteBtn.addEventListener('click',(e) => {
        console.log(e.target)
    })
    selectionDiv.appendChild(deleteBtn)

    body.appendChild(selectionDiv)

}