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


    signUpForm.appendChild(SignUpUserInput)
    signUpForm.appendChild(SignUpSubmitBtn)
    signUpCoverDiv.appendChild(signupH1)
    signUpCoverDiv.appendChild(signUpForm)
    SignUp.appendChild(signUpCoverDiv)
    body.appendChild(SignUp)








    // signUpForm.addEventListener('submit',(e)=> fetchUser(e))










    // function fetchUser(e){
    //     console.log(e.target);
        
    //     console.log(e.target.querySelector('#userId').value);
    //     user_id = e.target.querySelector('#userId').value
    //     console.log(`user id: ${user_id}`);
    //     fetch(`http://localhost:3000/users/${user_id}`).then(res => res.json()).then(user => {
    //     if(user){
    //         SignUp.remove()
    //         selection(user)
    //     }
    //     })
    //     e.preventDefault();
    // }
}