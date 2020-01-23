function signup(){

    const SignUp = document.createElement('div')
    SignUp.id = 'loginImg'


    const signUpCoverDiv = document.createElement('div')
    signUpCoverDiv.className = 'cover'

    const signupH1 = document.createElement('h1')
    signupH1.textContent = `Discover what's out there` 
    signupH1.id = 'loginH1'

    const signUpForm = document.createElement('form')
    signUpForm.className = 'flex-form'

    const SignUpUserInput = document.createElement('input')
    SignUpUserInput.type = 'search'
    SignUpUserInput.id = 'userId'
    SignUpUserInput.placeholder = `To create account enter name`

    const SignUpSubmitBtn = document.createElement('input')
    SignUpSubmitBtn.type = 'submit'
    SignUpSubmitBtn.value = 'LogIn'


    signUpForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log(e.target);
        let userName = e.target.querySelector('#userId').value
        console.log(userName)
        fetch('http://localhost:3000//users',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: userName, coin: 1000})
        }).then(res => res.json()).then(data => {
            if(data.message){
                alert('Try another name')
            }else{
                SignUp.remove()
                selection(data)
            }
        });
        
    })

    signUpForm.appendChild(SignUpUserInput)
    signUpForm.appendChild(SignUpSubmitBtn)
    signUpCoverDiv.appendChild(signupH1)
    signUpCoverDiv.appendChild(signUpForm)
    SignUp.appendChild(signUpCoverDiv)
    body.appendChild(SignUp)


}