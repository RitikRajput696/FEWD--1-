// Coffee data
const coffees = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    description:
      "Bright, floral notes with citrusy acidity and a clean finish. Known for its wine-like qualities and complex flavor profile.",
    price: 24.99,
    roast: "light",
    category: "single-origin",
    badge: "Popular",
    strength: "Medium",
    acidity: "High",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    description:
      "Well-balanced with chocolate and caramel notes. A classic coffee with medium body and smooth finish.",
    price: 19.99,
    roast: "medium",
    category: "single-origin",
    badge: "Best Seller",
    strength: "Medium",
    acidity: "Medium",
  },
  {
    id: 3,
    name: "House Blend",
    origin: "Multi-Origin",
    description:
      "Our signature blend combining beans from Central and South America. Perfect for everyday drinking.",
    price: 16.99,
    roast: "medium",
    category: "blend",
    badge: "House Special",
    strength: "Medium",
    acidity: "Low",
  },
  {
    id: 4,
    name: "French Roast",
    origin: "Multi-Origin",
    description:
      "Bold and intense with smoky undertones. A dark roast that delivers a robust coffee experience.",
    price: 18.99,
    roast: "dark",
    category: "blend",
    badge: "Bold",
    strength: "Strong",
    acidity: "Low",
  },
  {
    id: 5,
    name: "Jamaica Blue Mountain",
    origin: "Jamaica",
    description:
      "One of the world's most sought-after coffees. Mild, smooth, and perfectly balanced with no bitterness.",
    price: 89.99,
    roast: "medium",
    category: "specialty",
    badge: "Premium",
    strength: "Mild",
    acidity: "Low",
  },
  {
    id: 6,
    name: "Swiss Water Decaf",
    origin: "Colombia",
    description:
      "Chemical-free decaffeination process preserves the full flavor. Rich and smooth without the caffeine.",
    price: 21.99,
    roast: "medium",
    category: "decaf",
    badge: "Decaf",
    strength: "Medium",
    acidity: "Medium",
  },
  {
    id: 7,
    name: "Organic Guatemala",
    origin: "Guatemala",
    description:
      "Certified organic with full body and spicy undertones. Grown in volcanic soil at high altitude.",
    price: 26.99,
    roast: "medium",
    category: "organic",
    badge: "Organic",
    strength: "Full",
    acidity: "Medium",
  },
  {
    id: 8,
    name: "Hawaiian Kona",
    origin: "Hawaii",
    description:
      "Smooth and rich with low acidity. Grown on the volcanic slopes of Mauna Loa in perfect climate conditions.",
    price: 64.99,
    roast: "medium",
    category: "specialty",
    badge: "Rare",
    strength: "Medium",
    acidity: "Low",
  },
  {
    id: 9,
    name: "Espresso Blend",
    origin: "Multi-Origin",
    description:
      "Specially crafted for espresso. Dense, rich crema with chocolate and nutty undertones.",
    price: 22.99,
    roast: "dark",
    category: "blend",
    badge: "Espresso",
    strength: "Strong",
    acidity: "Low",
  },
];

let cart = [];
let filteredCoffees = [...coffees];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  displayCoffees(coffees);
  setupEventListeners();
});

function setupEventListeners() {
  // Category filter buttons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      filterCoffees();
    });
  });

  // Sort and filter controls
  document.getElementById("sort").addEventListener("change", filterCoffees);
  document.getElementById("roast").addEventListener("change", filterCoffees);
  document.getElementById("search").addEventListener("input", filterCoffees);
}

function displayCoffees(coffeesToShow) {
  const grid = document.getElementById("coffee-grid");

  if (coffeesToShow.length === 0) {
    grid.innerHTML =
      '<div class="loading">No coffees found matching your criteria.</div>';
    return;
  }

  grid.innerHTML = coffeesToShow
    .map(
      (coffee) => `
            <div class="coffee-card">
                <div class="coffee-image">
                    ☕
                    <div class="coffee-badge">${coffee.badge}</div>
                </div>
                <div class="coffee-content">
                    <h3 class="coffee-name">${coffee.name}</h3>
                    <div class="coffee-origin">Origin: ${coffee.origin}</div>
                    <p class="coffee-description">${coffee.description}</p>
                    <div class="coffee-details">
                        <span>Roast: ${
                          coffee.roast.charAt(0).toUpperCase() +
                          coffee.roast.slice(1)
                        }</span>
                        <span>Strength: ${coffee.strength}</span>
                        <span>Acidity: ${coffee.acidity}</span>
                    </div>
                    <div class="coffee-price">$${coffee.price.toFixed(2)}</div>
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="changeQuantity(${
                          coffee.id
                        }, -1)">-</button>
                        <input type="number" class="quantity-input" id="qty-${
                          coffee.id
                        }" value="1" min="1" max="10">
                        <button class="quantity-btn" onclick="changeQuantity(${
                          coffee.id
                        }, 1)">+</button>
                    </div>
                    <div class="coffee-actions">
                        <button class="btn btn-primary" onclick="addToCart(${
                          coffee.id
                        })">Add to Cart</button>
                        <button class="btn btn-secondary" onclick="viewDetails(${
                          coffee.id
                        })">Details</button>
                    </div>
                </div>
            </div>
        `
    )
    .join("");
}

function filterCoffees() {
  const category = document.querySelector(".category-btn.active").dataset
    .category;
  const roast = document.getElementById("roast").value;
  const search = document.getElementById("search").value.toLowerCase();
  const sort = document.getElementById("sort").value;

  filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory = category === "all" || coffee.category === category;
    const matchesRoast = roast === "all" || coffee.roast === roast;
    const matchesSearch =
      coffee.name.toLowerCase().includes(search) ||
      coffee.description.toLowerCase().includes(search) ||
      coffee.origin.toLowerCase().includes(search);

    return matchesCategory && matchesRoast && matchesSearch;
  });

  // Sort coffees
  filteredCoffees.sort((a, b) => {
    switch (sort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "roast":
        const roastOrder = { light: 1, medium: 2, dark: 3 };
        return roastOrder[a.roast] - roastOrder[b.roast];
      default:
        return 0;
    }
  });

  displayCoffees(filteredCoffees);
}

function changeQuantity(coffeeId, change) {
  const input = document.getElementById(`qty-${coffeeId}`);
  const currentValue = parseInt(input.value);
  const newValue = Math.max(1, Math.min(10, currentValue + change));
  input.value = newValue;
}

function addToCart(coffeeId) {
  const coffee = coffees.find((c) => c.id === coffeeId);
  const quantity = parseInt(document.getElementById(`qty-${coffeeId}`).value);

  const existingItem = cart.find((item) => item.id === coffeeId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...coffee, quantity });
  }

  updateCartDisplay();

  // Show success feedback
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "Added!";
  btn.style.background = "#28a745";
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "";
  }, 1000);
}

function updateCartDisplay() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
}

function viewDetails(coffeeId) {
  const coffee = coffees.find((c) => c.id === coffeeId);
  alert(
    `${coffee.name}\n\nOrigin: ${coffee.origin}\nRoast: ${coffee.roast}\nPrice: $${coffee.price}\n\n${coffee.description}`
  );
}

function toggleCart() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some coffee to get started!");
    return;
  }

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} x${item.quantity} - $${(
          item.price * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Your Cart:\n\n${cartItems}\n\nTotal: $${total.toFixed(2)}`);
}
