// user = {name: 'yash', coin: 1000}
// blackJack(user)

game()

function game(){

let user_id = 0
console.log(`user id: ${user_id}`);
// const body = document.querySelector('body')

// login()

const welcome = document.createElement('div')
welcome.id = 'welcome'

const loginBtn = document.createElement('h1')
loginBtn.textContent = 'LogIn'
loginBtn.id = 'loginBtn'

loginBtn.addEventListener('click',(e) => {
  welcome.remove()
  login()}
  )
welcome.appendChild(loginBtn)

const br = document.createElement('br')
welcome.appendChild(br)

const signUpBtn = document.createElement('h1')
signUpBtn.textContent = 'SignUp'
signUpBtn.id = 'loginBtn'

signUpBtn.addEventListener('click',(e) => {
  welcome.remove()
  signup()}
  )
welcome.appendChild(signUpBtn)


body.appendChild(welcome)








// /* <div id="loginImg">
//   <div class="cover">
//     <h1 id="loginH1">Discover what's out there.</h1>
//     <form  class="flex-form">
//       <input type="search" placeholder="Where do you want to go?">
//       <input type="submit" value="Search">
//     </form>
//   </div>
// </div> */


}