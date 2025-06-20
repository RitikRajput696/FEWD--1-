// Event filtering functionality
const filterButtons = document.querySelectorAll(".level-filter");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterLevel = button.getAttribute("data-level");

    eventCards.forEach((card) => {
      if (
        filterLevel === "all" ||
        card.getAttribute("data-level") === filterLevel
      ) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Calendar interaction
const calendarDays = document.querySelectorAll(".calendar-day.has-event");

calendarDays.forEach((day) => {
  day.addEventListener("click", () => {
    const dayNumber = day.textContent;
    let eventInfo = "";

    switch (dayNumber) {
      case "2":
        eventInfo = "Home Brewing Fundamentals - 10:00 AM";
        break;
      case "5":
        eventInfo = "Monthly Barista Battle - 6:00 PM";
        break;
      case "8":
        eventInfo = "Cold Brew & Summer Specials - 3:00 PM";
        break;
      case "12":
        eventInfo = "Coffee Roasting Workshop - 1:00 PM";
        break;
      case "19":
        eventInfo = "Specialty Coffee Cupping - 7:00 PM";
        break;
      case "26":
        eventInfo = "Espresso Masterclass - 2:00 PM";
        break;
    }

    alert(`July ${dayNumber}: ${eventInfo}`);
  });
});

// Newsletter subscription
const newsletterForm = document.querySelector(".signup-form");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with email: ${email}`);
  e.target.reset();
});

// Registration buttons
const registerButtons = document.querySelectorAll(".btn");

registerButtons.forEach((button) => {
  if (
    button.textContent.includes("Register") ||
    button.textContent.includes("Enter")
  ) {
    button.addEventListener("click", () => {
      alert(
        "Registration system coming soon! Please call us at (555) 123-BREW to reserve your spot."
      );
    });
  }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading animation to cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Initially hide cards for animation
eventCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
  observer.observe(card);
});
