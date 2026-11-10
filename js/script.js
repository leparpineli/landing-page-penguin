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

// Controle do Carrossel + Autoplay Suave (Item 3)
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const scrollAmount = 284;
let animationFrameId = null;

function smoothScrollCarousel(targetLeft, duration = 900) {
   if (animationFrameId) cancelAnimationFrame(animationFrameId);

   const startLeft = carousel.scrollLeft;
   const distance = targetLeft - startLeft;
   const startTime = performance.now();

   function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
   }

   function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      carousel.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
         animationFrameId = requestAnimationFrame(step);
      }
   }

   animationFrameId = requestAnimationFrame(step);
}

function nextSlide() {
   const maxScroll = carousel.scrollWidth - carousel.clientWidth;
   if (carousel.scrollLeft >= maxScroll - 15) {
      smoothScrollCarousel(0, 1100);
   } else {
      const nextTarget = Math.min(carousel.scrollLeft + scrollAmount, maxScroll);
      smoothScrollCarousel(nextTarget, 900);
   }
}

function prevSlide() {
   const prevTarget = Math.max(carousel.scrollLeft - scrollAmount, 0);
   smoothScrollCarousel(prevTarget, 900);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

let autoplayInterval = setInterval(nextSlide, 3500);

carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
carousel.addEventListener('mouseleave', () => {
   clearInterval(autoplayInterval);
   autoplayInterval = setInterval(nextSlide, 3500);
});

// Animação ao rolar a página - Scroll Reveal (Item 2)
const revealElements = document.querySelectorAll(
   '.title, .trending-card, .about-image, .about-info, .carousel-container, .newsletter-box'
);

revealElements.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add('visible');
         }
      });
   },
   { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Formulário do Clube Penguin / Newsletter (Item 7)
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');

if (newsletterForm) {
   newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterFeedback.textContent = '✨ Inscrição confirmada! Bem-vindo(a) ao Clube Penguin!';
      newsletterForm.reset();
   });
}