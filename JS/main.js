// Mobile menu toggle
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".main-nav ul");

mobileToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
  mobileToggle.classList.toggle("active");
});

// Add to cart functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.dataset.product;
    alert(`${product} added to cart!`);
    // Here you would typically update cart count and store in localStorage
  });
});

// Event registration
document.querySelectorAll(".register-event").forEach((button) => {
  button.addEventListener("click", (e) => {
    const event = e.target.dataset.event;
    window.location.href = `events.html?register=${encodeURIComponent(event)}`;
  });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
