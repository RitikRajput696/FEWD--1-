// Modal functionality
const modal = document.getElementById("welcomeModal");
const closeBtn = document.querySelector(".close");

// Show modal on page load (simulate first-time visitor)
window.addEventListener("load", () => {
  setTimeout(() => {
    modal.style.display = "block";
  }, 2000);
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Email signup
document.getElementById("emailSignup").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for signing up! Your 15% discount code is: WELCOME15");
  modal.style.display = "none";
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto-advance slideshow
setInterval(nextSlide, 5000);

// Slide controls
document.querySelector(".next-slide").addEventListener("click", nextSlide);
document.querySelector(".prev-slide").addEventListener("click", prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});
