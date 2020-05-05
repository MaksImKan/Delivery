const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      loginError = document.querySelector('.login-error'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out');
      
      
      let login = localStorage.getItem('delivery');


let toggleModalAuth =  () => {
      modalAuth.classList.toggle('is-open')
  }




const authorized = () => {

const logOut = () => {
  login = ''

  localStorage.removeItem('delivery')

  checkAuth()

  buttonAuth.style.display = ''
  userName.style.display = ''
  buttonOut.style.display = ''

  buttonOut.removeEventListener('click', logOut)
}


  console.log('авторизований');

  userName.textContent = login
  

  buttonAuth.style.display = 'none'
  userName.style.display = 'inline'
  buttonOut.style.display = 'block'

  buttonOut.addEventListener('click', logOut)
  
  }


const notAuthorized = () => {

  console.log('не авторизований');
  

  const logIn = (event) => {
    event.preventDefault()

    login = loginInput.value

    localStorage.setItem('delivery', login)

    if (login) {
      toggleModalAuth() 
      loginError.style.display = 'none'
    }else{
      console.log('неверный логин');
      loginError.style.display = 'block'
      
    }
    
    
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth)
    logInForm.removeEventListener('submit', logIn)
    
    logInForm.reset()
    checkAuth()
  }
  
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit', logIn)
}



let checkAuth = () => {

  if(login) {
    authorized()
  }else{
    notAuthorized()
    
  }

}


checkAuth()

