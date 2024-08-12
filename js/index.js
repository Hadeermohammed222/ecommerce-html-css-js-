////////////////// custome nav /////////////////
let navBtn = document.querySelector("header .btn");
let nav = document.querySelector("header nav");

navBtn.addEventListener('click',()=>{
  nav.classList.toggle("navbar");
})

//////////////// slider  ///////////////////////
let btnNext = document.querySelector(".home .container .fa-arrow-left");
let btnPrev = document.querySelector(".home .container .fa-arrow-right");
let home = document.querySelector(".home");

let imageOfSlider = 
[
  'images/child-bg2.jpg',
  'images/acssbackground1.jpeg',
  'images/home-pic4.jpeg',
  'images/home-bg1.jpeg',
  'images/services2.jpeg',
  'images/about4.jpeg'
]

let currentIndex = 0;

function showImg(){
  home.style.backgroundImage = `url(${imageOfSlider[currentIndex]})`;
}

function prevImg(){
   if(currentIndex > 0){
     currentIndex--;
     showImg();
   }
}

function nextImg(){
  if(currentIndex < imageOfSlider.length-1){
    currentIndex ++;
    showImg();
  }
}

btnPrev.addEventListener('click',prevImg);
btnNext.addEventListener('click',nextImg);

///////////////////////////////////////////
var product;
var sale;
var saleData;
var cart = [];
var filterGroup = document.querySelector(".filter-group");
var arr = [];
let btn_product = document.querySelectorAll('.products-btn a');
let overlapCart = document.querySelector(".overlap-cart");
//////////////// Product Fetching and Display /////
window.addEventListener('load',async()=>{
  await getProducts();
    
})
async function getProducts() {
    product = await fetch('http://localhost:3005/products');
    product = await product.json();
}
btn_product.forEach(element => {
    element.addEventListener('click', () => {
        arr = product.filter(pro => element.innerHTML === pro.title);
        showData(arr);
       
    });
});

// Function to show data in filter group.
function showData(dataSales) {
    filterGroup.innerHTML = ' ';
    saleData = '';
    for (var i = 0; i < dataSales.length; i++) {
      saleData += `
      <figure>
        <img src=${dataSales[i].img} alt="woman1">
        <div class="product-body">
          <h3>${dataSales[i].title}</h3>
          <p>${dataSales[i].description}</p>
          <p>${dataSales[i].price}$</p>
          <button class="add-to-cart-btn">Add Cart</button>
        </div>
      </figure>
    `;
    }
    // filterGroup.innerHTML = saleData;
    filterGroup.insertAdjacentHTML('beforeend',saleData);
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
    })
  }
//Add product to cart
function addToCart(event) {

  const button = event.target;
  const figure = button.closest('figure');
  img = figure.children[0].src;
  price = figure.children[1].children[2].innerHTML;
  para = figure.children[1].children[1].innerHTML;
  
  obj = {
    image:img,
    price:price,
    para:para
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the new product to the cart
  cart.push(obj);
  
  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartCount();
  
  }
// Function to update the cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  overlapCart.innerHTML = cart.length;
}

// Call this function when the page loads
window.addEventListener('load', () => {
  updateCartCount();
});

