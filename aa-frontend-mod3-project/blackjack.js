
function blackJack(user){
    // console.log(user.coin);
    


    const body = document.querySelector('body')
    let total = 0 
    let bit = 0 
    let status = 'IDK'
    let dealerTotal = 0
    // console.log(total)
    
    
    const coinAmount = document.createElement('h1')
    coinAmount.textContent = `Coin: ${user.coin}`
    coinAmount.id = 'coinAmount'
    body.appendChild(coinAmount)
    
    
    const div = document.createElement('div')
    div.id = 'gameDiv'
    div.textContent = 'hi'
    
    
    const startBtn = document.createElement('button')
    startBtn.textContent = 'Start'
    startBtn.id = 'startBtn'
    startBtn.addEventListener('click', (e) => {
        e.target.remove()
        
        startGame()})
    
    
    body.appendChild(div)
    body.appendChild(startBtn)
    
    function startGame(){
    
    
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
                e.target.remove()
                hitBtn.remove()
                goDealer()}
                )
            body.appendChild(stayBtn)
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
        

        e.preventDefault()


    }

    
    function renderLost(){
        let cards =document.querySelectorAll('#cardImg')
        cards.forEach(card => card.remove())
    
        // document.querySelectorAll('#cardImg').remove()
        // const img = document.createElement('img')
        // img.id = 'lostImg'
        // img.src = 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4b9.png'
        // div.appendChild(img)
        fetch(`http://localhost:3000/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {coin:  bit + user.coin} )
        }).then(res => res.json()).then(user => {
            while(body.firstChild) {
                body.firstChild.remove();
            }
            blackJack(user)
        })
        
    
    }


    function renderWon(){
        // let cards =document.querySelectorAll('#cardImg')
        // cards.forEach(card => card.remove())
    }

    
    
    
    function fetchCard(){
        let number = Math.floor(Math.random() * 52)
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
    
        div.appendChild(img)
    
    
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
    }else if(status === 'WIN'){
        renderWon()
    }
        
        if(dealerTotal === 0){
            fetchDealerCard()
        }else if(dealerTotal > total){
            status = 'LOST'
        }else if(dealerTotal < 16 && dealerTotal < total){
            fetchDealerCard()
        }else if(dealerTotal > 21){
            status = 'WIN'
        }else{
            status = 'LOST'
        }

        console.log(dealerTotal);
        
        console.log(status);
        
    
    }
    
    
    function fetchDealerCard(){
        console.log(dealerTotal);
        console.log('card fetched');
        
        let number = Math.floor(Math.random() * 52)
        fetch('http://localhost:3000/cards/'+number).then(res => res.json()).then(card => renderDealerCard(card))
    }
    
    
    function renderDealerCard(card){
        const img = document.createElement('img')
        img.src = card.image
        img.id = 'dealerImg'
        div.appendChild(img)
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