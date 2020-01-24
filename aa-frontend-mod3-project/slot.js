const body = document.querySelector('body')
// slotMachine()
// https://im.ezgif.com/tmp/ezgif-1-c95a4c47e2fa.gif
function slotMachine(user, userGame){
    let value1 = 10;
    let value2 = 10;
    let value3 = 10;
    let total = 30;
    let win = 0
    let userCoin = user.coin
    const slotDiv = document.createElement('div')
    slotDiv.id = 'slotDiv'
    body.appendChild(slotDiv)

    const backBtn = document.createElement('h1')
    backBtn.textContent = 'GO BACK'
    backBtn.id = 'backBtn1'
    backBtn.addEventListener('click',(e) => {
        while(body.firstChild) {
            body.firstChild.remove(); 
          }
            selection(user)
    })
    slotDiv.appendChild(backBtn)

    const deleteBtn = document.createElement('h1')
    deleteBtn.textContent = 'DELETE'
    deleteBtn.id = 'deleteBtn1'
    deleteBtn.addEventListener('click',(e) => {
        console.log(e.target)
        fetch(`http://localhost:3000/user_games/${user.id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json()).then(uG => {
            slotDiv.remove()
            selection(user)
            alert('USER_GAME SUCCESSFULLY DELETED')
        })
    })
    slotDiv.appendChild(deleteBtn)


    const coinAmount = document.createElement('h1')
    coinAmount.textContent = `💵 $${user.coin}`
    coinAmount.id = 'coinAmount'
    slotDiv.appendChild(coinAmount)

    const h1 = document.createElement('h1')
    h1.textContent = '$10/Play'
    h1.id = 'cost'
    slotDiv.appendChild(h1)


    const symbolOne = document.createElement('img')
    symbolOne.src = 'spin.gif'
    symbolOne.id = 'sybOne'
    slotDiv.appendChild(symbolOne)

    const symbolTwo = document.createElement('img')
    symbolTwo.src = 'spin.gif'
    symbolTwo.id = 'sybTwo'
    slotDiv.appendChild(symbolTwo)

    const symbolThree = document.createElement('img')
    symbolThree.src = 'spin.gif'
    symbolThree.id = 'sybThree'
    slotDiv.appendChild(symbolThree)
    


    

    const playBtn = document.createElement('img')
    playBtn.id = 'playSlot'
    playBtn.src = 'http://www.clker.com/cliparts/H/u/D/n/Y/2/red-ball-md.png'
    playBtn.addEventListener('click',(e)=>{
        e.target.remove()

        console.log(e.target);
        userCoin -= 10
        fetch(`http://localhost:3000/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {coin:  userCoin} )
        }).then(res => res.json()).then(user => {
            coinAmount.textContent = `💵 $${user.coin}`
            slotDiv.appendChild(coinAmount)
        }).then(() => {

        if(total ===30 ){
            win = 0
            fetch(`http://localhost:3000/slots/${((Math.floor(Math.random() * 4))+1)}`).then(res => res.json()).then(sym => {
            
            symbolOne.src = sym.image
            symbolOne.classList.add('animated', 'heartBeat')
            slotDiv.appendChild(symbolOne)
            value1 = sym.value
            console.log(`----------------------- 1`)
            }).then(() =>
            fetch(`http://localhost:3000/slots/${((Math.floor(Math.random() * 4))+1)}`).then(res => res.json()).then(sym => {
    
            symbolTwo.src = sym.image
            symbolTwo.classList.add('animated', 'heartBeat')
            slotDiv.appendChild(symbolTwo)
            value2 = sym.value
            console.log(`----------------------- 2`)
            })).then(() => 
            fetch(`http://localhost:3000/slots/${((Math.floor(Math.random() * 4))+1)}`).then(res => res.json()).then(sym => {
            
            symbolThree.src = sym.image
            symbolThree.classList.add('animated', 'heartBeat')
            slotDiv.appendChild(symbolThree)
            value3 = sym.value
            console.log(`----------------------- 3`)
            })).then(() =>{
            console.log(value1);
            console.log(value2)
            console.log(value3);
            total = value3 + value2 + value1
            console.log(total);
            }).then(() =>{
            console.log(total)
                if(value1 === 7 && value2 === 7 && value3 === 7){
                    win = 500
                }else if(value1 === value2 && value2 === value3){
                    win = 100
                }else if(value1 === value2){
                    win = 20
                }else if(value2 === value3){
                    win = 20 
                }else if(value1 === value3){
                    win = 20 
                }else{
                    win = 0 
                }
            console.log(`###############${win}`);
            
        }).then(()=> fetchWin(user, win, slotDiv,userGame,userCoin))
        }
    })
    })

    slotDiv.appendChild(playBtn)

}

function fetchWin(user, winAmount, slotDiv, userGame, userCoin){
    console.log(user, winAmount);
    userCoin += winAmount
    fetch(`http://localhost:3000/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {coin:  userCoin} )
        }).then(res => res.json()).then(user => {
            coinAmount.textContent = `💵 $${user.coin}`
            slotDiv.appendChild(coinAmount)
            total = 30
            const amountWon = document.createElement('h1')
            amountWon.id = 'amtWon'
            amountWon.textContent = `$${winAmount}`
            slotDiv.appendChild(amountWon)

            const restart = document.createElement('img')
            restart.src = 'https://www.pinclipart.com/picdir/big/22-229680_update-clipart-free-for-download-restart-clip-art.png'
            restart.id = 'restartBtn1'
            restart.addEventListener('click',(e)=>{
                e.target.remove()
            while(body.firstChild) {
                body.firstChild.remove(); 
              }
            slotMachine(user, userGame)

            })
            slotDiv.appendChild(restart)
            

        })
    
}
