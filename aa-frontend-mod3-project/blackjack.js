
function blackJack(){



    const body = document.querySelector('body')
    let total = 0 
    let status = 'IDK'
    let dealerTotal = 0
    console.log(total)
    
    
    
    
    
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
            const hitBtn = document.createElement('button')
            hitBtn.textContent = 'Hit Me!'
            hitBtn.id = 'hitBtn'
            hitBtn.addEventListener('click',(e) => {
                console.log(e.target.parentElement.querySelector('#stayBtn').remove())
                e.target.remove()
                fetchCard()
            })
            body.appendChild(hitBtn)
            
    
    
            const stayBtn = document.createElement('button')
            stayBtn.textContent = 'Stay'
            stayBtn.id = 'stayBtn'
            stayBtn.addEventListener('click',(e) => { 
                e.target.remove()
                goDealer(e)}
                )
            body.appendChild(stayBtn)
        }
    
    
    }
    
    function renderLost(){
        let cards =document.querySelectorAll('#cardImg')
        cards.forEach(card => card.remove())
    
        // document.querySelectorAll('#cardImg').remove()
        const img = document.createElement('img')
        img.id = 'lostImg'
        img.src = 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4b9.png'
        div.appendChild(img)
    
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
        console.log(total)
    
        div.appendChild(img)
    
    
        if(total > 21){
            status = 'LOST'
        }
        console.log(status)
        if(document.querySelectorAll('img').length >= 2){
          startGame()  
        }
        
    }
    
    
    function goDealer(e){
        e.target.remove()
    
        if(dealerTotal === 0){
            if(fetchDealerCard() === 'done'){fetchDealerCard()}
        }
    
    
    }
    
    
    function fetchDealerCard(){
        let number = Math.floor(Math.random() * 52)
        fetch('http://localhost:3000/cards/'+number).then(res => res.json()).then(card => renderDealerCard(card))
        return 'done'
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
        console.log(`dealer total: ${dealerTotal}`)
        
    }
    }