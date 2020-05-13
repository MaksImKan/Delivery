const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

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
      cardsMenu = document.querySelector('.cards-menu'),
      restaurantTitle = document.querySelector('.restaurant-title'),
      rating = document.querySelector('.rating'),
      minPrice = document.querySelector('.price'),
      category = document.querySelector('.category'),
      modalBody = document.querySelector('.modal-body'),
      modalPricetag = document.querySelector('.modal-pricetag'),
      clearCart = document.querySelector('.clear-cart'),
      inputSearch = document.querySelector('.input-search');

const cart = [];

      
      
let login = localStorage.getItem('delivery');

const getData = async function(url) {
  const response = await fetch(url);

  if(!response.ok){
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
  }

  return await response.json();
}



const valid = (str) => {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
  return nameReg.test(str)
}
let toggleModalAuth =  () => {
    modalAuth.classList.toggle('is-open')
  }


const returnMain = () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
  }

const authorized = () => {

const logOut = () => {

  login = ''

  localStorage.removeItem('delivery')

  checkAuth()

  buttonAuth.style.display = '';
  userName.style.display = '';
  buttonOut.style.display = '';
  cartButton.style.display = '';

  buttonOut.removeEventListener('click', logOut)

  returnMain()
}




  userName.textContent = login
  

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';

  buttonOut.addEventListener('click', logOut)
  
  }


const notAuthorized = () => {

  console.log('не авторизований');
  

  const logIn = (event) => {
    event.preventDefault()

    login = loginInput.value

    localStorage.setItem('delivery', login)

    if (valid(loginInput.value)) {
      toggleModalAuth() 
      loginError.style.display = 'none'
    }else{
      console.log('неверный логин');
      loginError.style.display = 'block'
      login = ''
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

const createCardRestaurant = (restaurant) => {

  const { image, kitchen, name, price, products, stars, time_of_delivery } = restaurant
  
  const card = `
    <a href="restaurant.html" class="card card-restaurant" data-products="${products}" data-info = "${[name, price, stars, kitchen ]}">
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${time_of_delivery} мин</span>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="rating">
         ${stars}
        </div>
        <div class="price">От ${price}₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card)
}


const createCardGood= ({ description, image, name, price, id }) => {
  
  const card = document.createElement('div');
  card.classList.add('card');

  card.insertAdjacentHTML('beforeend',`
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">
            ${description}
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}



const openGoods = (event) => {

  event.preventDefault()

  let target = event.target;

  let restaurant = target.closest('.card-restaurant')

  if (restaurant) {

    const info = restaurant.dataset.info.split(',');
    
    const [ name, price, stars, kitchen ] = info;


    

    if(login){
      
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      
      cardsMenu.textContent = '';

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От   ${price}   ₽` ;
      category.textContent = kitchen;
      
      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      })


    }else{
      toggleModalAuth();
    }

  }
  
 
}


const addToCart = (event) => {
  let target = event.target;

  const buttonAdToCart = target.closest('.button-add-cart')
  if (buttonAdToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price-bold').textContent;
    const id = buttonAdToCart.id;

    const food = cart.find((item) => {
      return item.id === id
    })

    if(food) {
      food.count += 1
    }else{
      cart.push({
        id: id,
        title: title,
        cost: cost,
        count: 1
      })
    }

    
    
    console.log(cart);
    

    
  }
  
}

const renderCart = () => {
  modalBody.textContent = '';
  cart.forEach(({ id, title, cost, count }) => {
    const itemCart = `
      <div class="food-row">
        <span class="food-name">${title}</span>
        <strong class="food-price">${cost} </strong>
        <div class="food-counter">
          <button class="counter-button counter-minus" data-id ="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id ="${id}">+</button>
      </div>
    </div>
    `

    modalBody.insertAdjacentHTML('afterbegin',itemCart)
  });

  const totalPrice = cart.reduce(function(result, item){
    return (parseFloat(item.cost) * item.count) + result;
  }, 0)

  modalPricetag.textContent = totalPrice + ' ₽';
}


const changeCount = (event) => {
  const target = event.target;

    if(target.classList.contains('counter-minus')){
      const food = cart.find(function(item){
        return item.id === target.dataset.id
      })
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1)
      }
      food.count--
      renderCart()
    }

    if(target.classList.contains('counter-plus')){
      const food = cart.find(function(item){
        return item.id === target.dataset.id
      })
      food.count++
      renderCart()
    }
    
}

const init = () => {
  
getData('./db/partners.json').then(function (data) {
  data.forEach(createCardRestaurant);
})
clearCart.addEventListener('click', () => {
  cart.length = 0;
  renderCart()
})
modalBody.addEventListener('click', changeCount)
cardsMenu.addEventListener('click', addToCart)
cartButton.addEventListener('click', () => {
    renderCart()
    toggleModal()
})
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', () => {
  
  returnMain()
})
inputSearch.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const target = event.target;
    const value = target.value;
    const goods = [];

    getData('./db/partners.json').then(function (data) {
      data.forEach(createCardRestaurant);

    const products = data.map(item => {
        return item.products
    })

    products.forEach(product => {
      getData(`./db/${product}`).then(function (data) {

        goods.push(...data);

        const searcGoods = goods.filter((item) => {
            return item.name.includes(value)
        })

        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        
        cardsMenu.textContent = '';

        restaurantTitle.textContent = 'Результат поиска';
        rating.textContent = '';
        minPrice.textContent = '';
        category.textContent = '';

       
      })
      .then((data) => {
        goods.forEach(createCardGood)
      })
    })
    
      
    })
  }
})


new Swiper('.swiper-container', {
  loop: true,
  autoplay: true
})
}

init ()