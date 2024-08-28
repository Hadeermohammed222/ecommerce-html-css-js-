let navBtn = document.querySelector("header .btn");
let nav = document.querySelector("header nav");

navBtn.addEventListener('click',()=>{
  nav.classList.toggle("navbar");
})
