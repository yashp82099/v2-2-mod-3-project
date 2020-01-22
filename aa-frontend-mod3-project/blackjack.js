
function blackJack(user){
    // console.log(user.coin);
    


    const body = document.querySelector('body')
    const userTotal = document.createElement('h1')
    let total = 0 
    let bit = 0 
    let status = 'IDK'
    let dealerTotal = 0
    // console.log(total)
    
    
    
    
    
    const div = document.createElement('div')
    div.id = 'gameDiv'
    div.textContent = 'hi'

    const imgDiv = document.createElement('div')
    imgDiv.id = 'imgDiv'

    const dealImgDiv = document.createElement('div')
    dealImgDiv.id = 'dealImgDiv'

    
    
    const startBtn = document.createElement('button')
    startBtn.textContent = 'Start'
    startBtn.id = 'startBtn'
    startBtn.addEventListener('click', (e) => {
        e.target.remove()
        
        startGame()})
    
    
    body.appendChild(div)
    body.appendChild(startBtn)



     const coinAmount = document.createElement('h1')
    coinAmount.textContent = `💵 $${user.coin}`
    coinAmount.id = 'coinAmount'
    div.appendChild(coinAmount)
    div.appendChild(imgDiv)
    div.appendChild(dealImgDiv)

    function startGame(){
        console.log(`------current user total ${total}`);

        if(total > 2){
            userTotal.textContent = total
            userTotal.id = 'userTotal'
            body.appendChild(userTotal)
        }
        
    
        if(status === 'LOST'){
            renderLost()
        }
        if(total === 0){
            if(fetchCard() === 'done'){fetchCard()}
        }else if(total <= 21){

            if(bit === 0){
            const bitForm = document.createElement('form')
            const bitInput = document.createElement('input')
            bitInput.type = 'text'
            bitInput.placeholder = 'BIT'
            bitInput.id = 'bit'
            const bitBtn = document.createElement('input')
            bitBtn.type = 'submit'
            bitForm.addEventListener('submit',(e) => userBit(e))
            bitForm.appendChild(bitInput)
            bitForm.appendChild(bitBtn)
            body.appendChild(bitForm)

            }
            if(bit > 10){
            const hitBtn = document.createElement('button')
            hitBtn.textContent = 'Hit Me!'
            hitBtn.id = 'hitBtn'
            hitBtn.addEventListener('click',(e) => {
                // console.log(e.target.parentElement.querySelector('#stayBtn').remove())
                stayBtn.remove()
                e.target.remove()
                fetchCard()
            })
            body.appendChild(hitBtn)
            
    
    
            const stayBtn = document.createElement('button')
            stayBtn.textContent = 'Stay'
            stayBtn.id = 'stayBtn'
            stayBtn.addEventListener('click',(e) => { 
                console.log(`user total is ${total}`);
                e.target.remove()
                hitBtn.remove()
                goDealer()}
                )
            body.appendChild(stayBtn)
            }
        }
    
    
    }

    function userBit(e){
        let userBit = parseInt(e.target.querySelector('#bit').value)
        console.log(userBit);
        
        if(userBit && typeof userBit === 'number' && userBit < user.coin){
            e.target.remove()
            bit = userBit
        }else{
            userBit = ''
        }

        console.log(bit);
        
        startGame()
        e.preventDefault()


    }

    
    function renderLost(){

        console.log('----------------YOU LOST_____________');
        fetch(`http://localhost:3000/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {coin:  user.coin - bit } )
        }).then(res => res.json()).then(user => {
            const loseBar = document.createElement('h1')
            loseBar.id = 'loseBar'
            loseBar.textContent = `That's sad ${user.name}, you just lost $${bit}`
            body.appendChild(loseBar)
            const restart = document.createElement('img')
            restart.src = 'https://www.pinclipart.com/picdir/big/22-229680_update-clipart-free-for-download-restart-clip-art.png'
            restart.id = 'restartBtn'
            restart.addEventListener('click',(e)=>{
                e.target.remove()
            while(body.firstChild) {
                body.firstChild.remove(); 
              }
            blackJack(user)

            })
            div.appendChild(restart)
        })
    
    
    }


    function renderWon(){
        console.log('----------------YOU WON_____________');
        
        // let cards =document.querySelectorAll('#cardImg')
        // cards.forEach(card => card.remove())
        fetch(`http://localhost:3000/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {coin:  user.coin + bit } )
        }).then(res => res.json()).then(user => {
            
            const winBar = document.createElement('h1')
            winBar.id = 'winBar'
            winBar.textContent = `Nice job ${user.name}, you just won $${bit}`
            body.appendChild(winBar)
            const restart = document.createElement('img')
            restart.src = 'https://www.pinclipart.com/picdir/big/22-229680_update-clipart-free-for-download-restart-clip-art.png'
            restart.id = 'restartBtn'
            restart.addEventListener('click',(e)=>{
                e.target.remove()
            while(body.firstChild) {
                body.firstChild.remove(); 
              }
            blackJack(user)

            })
            div.appendChild(restart)

            
        })

    }

    
    
    
    function fetchCard(){
        let number = Math.floor(Math.random() * 51)
        fetch('http://localhost:3000/cards/'+number).then(res => res.json()).then(card => renderCard(card))
        return 'done'
    }
    
    function renderCard(card){
        // console.log(card)s
        
        const img = document.createElement('img')
        img.src = card.image
        img.id = 'cardImg'
        if(card.value === 'ACE'){
            total += 10
        }else if(card.value === 'JACK'){
            total += 10
        }else if(card.value === 'QUEEN'){
            total += 10
        }else if(card.value === "KING"){
            total += 10
        }else{
            total += parseInt(card.value)
        }
        // console.log(total)
    
        imgDiv.appendChild(img)
    
    
        if(total > 21){
            status = 'LOST'

        }
        // console.log(status)
        if(document.querySelectorAll('img').length >= 2){
          startGame()  
        }
        
    }
    
    
    function goDealer(){
        
    if(status === 'LOST'){
        renderLost()
        return 'done'
    }else if(status === 'WIN'){
        renderWon()
        return 'done'
    }
        
        if(dealerTotal === 0){
            fetchDealerCard()
        }else if(dealerTotal < 16 && dealerTotal < total){
            fetchDealerCard()
        }else if(dealerTotal > 21){
            status = 'WIN'
            goDealer()
        }else if(total > dealerTotal){
            status = 'WIN'
            goDealer()
        }else{
            status = 'DRAW'
            while(body.firstChild) {
                body.firstChild.remove();
            }
            const winBar = document.createElement('h1')
            winBar.id = 'winBar'
            winBar.textContent = `Draw!`
            body.appendChild(winBar)
            blackJack(user)
        }

        console.log(dealerTotal);
        
        console.log(status);
        
        
    }
    
    
    function fetchDealerCard(){
        console.log(dealerTotal);
        console.log('card fetched');
        
        let number = Math.floor(Math.random() * 51)
        fetch('http://localhost:3000/cards/'+number).then(res => res.json()).then(card => renderDealerCard(card))
    }
    
    
    function renderDealerCard(card){
        const img = document.createElement('img')
        img.src = card.image
        img.id = 'dealerImg'
        dealImgDiv.appendChild(img)
        if(card.value === 'ACE'){
            dealerTotal += 10
        }else if(card.value === 'JACK'){
            dealerTotal += 10
        }else if(card.value === 'QUEEN'){
            dealerTotal += 10
        }else if(card.value === "KING"){
            dealerTotal += 10
        }else{
            dealerTotal += parseInt(card.value)
        }
        // console.log(`dealer total: ${dealerTotal}`)
        
        goDealer()
        
    }
}