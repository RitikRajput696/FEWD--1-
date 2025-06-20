// Add smooth scroll behavior
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".equipment-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add floating animation to coffee beans
  const beans = document.querySelectorAll(".coffee-bean");
  beans.forEach((bean, index) => {
    bean.style.animationDelay = `${index * 2}s`;
  });
});
