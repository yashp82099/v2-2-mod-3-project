function login(){

    const loginDiv = document.createElement('div')
    loginDiv.id = 'loginImg'


    const coverDiv = document.createElement('div')
    coverDiv.className = 'cover'

    const loginH1 = document.createElement('h1')
    loginH1.textContent = `Discover what's out there` 
    loginH1.id = 'loginH1'

    const loginForm = document.createElement('form')
    loginForm.className = 'flex-form'

    const userInput = document.createElement('input')
    userInput.type = 'search'
    userInput.id = 'userId'
    userInput.placeholder = `Enter you casino ID`

    const submitBtn = document.createElement('input')
    submitBtn.type = 'submit'
    submitBtn.value = 'LogIn'


    loginForm.appendChild(userInput)
    loginForm.appendChild(submitBtn)
    coverDiv.appendChild(loginH1)
    coverDiv.appendChild(loginForm)
    loginDiv.appendChild(coverDiv)
    body.appendChild(loginDiv)








    loginForm.addEventListener('submit',(e)=> fetchUser(e))

    function fetchUser(e){
        console.log(e.target);
        
        console.log(e.target.querySelector('#userId').value);
        user_id = e.target.querySelector('#userId').value
        console.log(`user id: ${user_id}`);
        fetch(`http://localhost:3000/users/${user_id}`).then(res => res.json()).then(user => {
        if(user){
            loginDiv.remove()
            selection(user)
        }
        })
        e.preventDefault();
    }
}