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
      buttonOut = document.querySelector('.button-out'),
      cardsRestaurants = document.querySelector('.cards-restaurants'),
      containerPromo = document.querySelector('.container-promo'),
      restaurants = document.querySelector('.restaurants'),
      menu = document.querySelector('.menu'),
      logo = document.querySelector('.logo'),
      cardsMenu = document.querySelector('.cards-menu');

     let  authToken;

      
      
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

  authToken = false;

  buttonOut.removeEventListener('click', logOut)


}




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
    
    authToken = true;

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

const createCardRestaurant = () => {
  const card = `
    <a href="restaurant.html" class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Татака</h3>
        <span class="card-tag tag">50 мин</span>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
  </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card)
}

createCardRestaurant()


const openGoods = (event) => {

    event.preventDefault()

  let target = event.target;

  let restaurant = target.closest('.card-restaurant')

  containerPromo.classList.add('hide');
  restaurants.classList.add('hide');
  menu.classList.remove('hide');
  
cardsMenu.textContent = '';

createCardGood()
createCardGood()
 


  if (!authToken) {
    toggleModalAuth()
  }
}


const createCardGood= () => {

    const card = document.createElement('div');
    card.classList.add('card');

    card.insertAdjacentHTML('beforeend',`
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">Пицца Классика</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
              грибы.
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">510 ₽</strong>
          </div>
        </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}



cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', () => {
  
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');

})