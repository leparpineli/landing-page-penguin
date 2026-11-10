const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon= document.querySelector('.btn-mobile i');

mobileBtn.addEventListener('click', () => {
   navLinks.classList.toggle('show');
   icon.classList.toggle('fa-times');
   icon.classList.toggle('fa-bars');
})

window.addEventListener('scroll', () => {
   const header = document.getElementById('header')

   if (window.scrollY > 0) {
      header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
   } else {
      header.style.boxShadow = 'none';
   }
})

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const scrollAmount = 284;

nextBtn.addEventListener('click', () => {
   carousel.scrollLeft += scrollAmount;
});

prevBtn.addEventListener('click', () => {
   carousel.scrollLeft -= scrollAmount;
});