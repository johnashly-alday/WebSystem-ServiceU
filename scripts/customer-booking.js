// ---------- state ----------
let selectedCategory = "Hardware";
let selectedProblemText = "Component Replacement";
let selectedPaymentMethod = "Cash";
let selectedRepairer = {
  name: "Luis Fernando",
  category: "Hardware",
  rating: "Rate: 4.0",
  photo: "../img/luis.jpg",
};

// ---------- UI helpers ----------
function selectCategory(element, category) {
  document
    .querySelectorAll(".category-option")
    .forEach((opt) => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedCategory = category;
}

function showRepairers() {
  document.getElementById("categoryScreen").classList.add("hidden");
  document.getElementById("repairersScreen").classList.remove("hidden");
  document.querySelectorAll(".category-section").forEach((section) => {
    if (section.dataset.category === selectedCategory)
      section.classList.remove("hidden");
    else section.classList.add("hidden");
  });
  // ensure filter default active:
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(".filter-btn").classList.add("active");
}

function showCategories() {
  document.getElementById("repairersScreen").classList.add("hidden");
  document.getElementById("categoryScreen").classList.remove("hidden");
}

function filterRepairers(filterType) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  // placeholder for filter logic
  console.log("Filtering by:", filterType);
}

// open booking modal when clicking a "Book" button on card
function openBookingModalFromCard(btn) {
  const card = btn.closest(".repairer-card-item");
  const name = card.querySelector(".repairer-name").textContent;
  const category = card.querySelector(".repairer-category").textContent;
  const rating = card.querySelector(".repairer-rating").textContent;
  const photo = card.querySelector(".repairer-photo").src;

  selectedRepairer = { name, category, rating, photo };

  openBookingModal(name, category, rating, photo);
}

function openBookingModal(name, category, rating, photoSrc) {
  const modal = document.getElementById("bookingModal");
  document.getElementById("modalRepairerName").textContent = name;
  document.getElementById("modalRepairerCategory").textContent = category;
  document.getElementById("modalRepairerRating").textContent = rating;
  document.getElementById("modalRepairerPhoto").src = photoSrc;
  document.getElementById("modalRepairerPhoto").alt = name;

  // populate base service price if needed (you can customize)
  document.getElementById("baseServicePrice").textContent = "500 PHP";

  // reset some fields (but keep previously selected problem/payment)
  document.getElementById("bookingDate").value = "";
  document.getElementById("timeHour").value = "";
  document.getElementById("timeMinute").value = "";
  document.getElementById("timePeriod").value = "PM";
  document.getElementById("selectedProblem").textContent = selectedProblemText;
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  // set default selected problem visually
  document
    .querySelectorAll(".problem-option")
    .forEach((el) => el.classList.remove("selected"));
  const firstProblem = document.querySelector(".problem-option");
  if (firstProblem) firstProblem.classList.add("selected");

  // set payment default
  document
    .querySelectorAll(".payment-option")
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelector('.payment-option[data-method="Cash"]')
    .classList.add("selected");
  selectedPaymentMethod = "Cash";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  // enable modal Book-now button (in case it was disabled)
  enableModalBookButton();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("bookingModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal("bookingModal");
});
document.getElementById("receiptModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal("receiptModal");
});
document.getElementById("reviewModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal("reviewModal");
});

// Problems
function selectProblem(element, problemName) {
  document
    .querySelectorAll(".problem-option")
    .forEach((opt) => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedProblemText = problemName;
  document.getElementById("selectedProblem").textContent = problemName;
  enableModalBookButton();
}

// Payment selection
function selectPayment(element, method) {
  document
    .querySelectorAll(".payment-option")
    .forEach((opt) => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedPaymentMethod = method;
  enableModalBookButton();
}

// Enable/disable Book button in booking modal depending on required fields
function enableModalBookButton() {
  // Simple check: problems selected and payment method selected (and photo/name exist)
  const bookBtn = document.getElementById("bookNowBtn");
  if (!bookBtn) return;
  // We'll enable it; final validation is done when building review modal
  bookBtn.disabled = false;
  bookBtn.style.opacity = "1";
  bookBtn.style.cursor = "pointer";
}

// BOOK NOW clicked inside booking modal -> New behavior: show Review modal (preview) first
document.getElementById("bookNowBtn").addEventListener("click", function () {
  // Validate required fields before showing review
  const date = document.getElementById("bookingDate").value;
  const hour = document.getElementById("timeHour").value;
  const minute = document.getElementById("timeMinute").value;
  const period = document.getElementById("timePeriod").value;
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const addr = document.getElementById("customerAddress").value.trim();

  // Basic validation
  if (!date || !hour || !minute) {
    alert("Please select date and time.");
    return;
  }
  if (!name || !phone || !addr) {
    alert("Please enter your name, phone number, and address.");
    return;
  }

  // Build formatted time
  const paddedHour = String(hour).padStart(2, "0");
  const paddedMinute = String(minute).padStart(2, "0");
  const formattedTime = `${paddedHour}:${paddedMinute} ${period}`;

  // Determine estimated price: base + min-max from selected problem
  const selectedProblemElement = document.querySelector(
    ".problem-option.selected"
  );
  let min = 200,
    max = 400;
  if (selectedProblemElement) {
    min = parseInt(selectedProblemElement.dataset.min || 200);
    max = parseInt(selectedProblemElement.dataset.max || 400);
  }
  const base = 500;
  const minTotal = base + min;
  const maxTotal = base + max;
  const estimated = `${minTotal} - ${maxTotal} PHP`;

  // populate review modal
  document.getElementById("rev_repairer").textContent =
    document.getElementById("modalRepairerName").textContent;
  document.getElementById("rev_category").textContent = document.getElementById(
    "modalRepairerCategory"
  ).textContent;
  document.getElementById("rev_problem").textContent = selectedProblemText;
  document.getElementById("rev_date_time").textContent = `${new Date(
    date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} at ${formattedTime}`;
  document.getElementById("rev_payment").textContent = selectedPaymentMethod;
  document.getElementById("rev_total").textContent = estimated;

  // show review modal
  document.getElementById("reviewModal").classList.add("active");
  document.body.style.overflow = "hidden";
});

// finalizeBooking() -> called by Confirm on review modal to show final receipt
function finalizeBooking() {
  // gather all the values again
  const date = document.getElementById("bookingDate").value;
  const hour = document.getElementById("timeHour").value;
  const minute = document.getElementById("timeMinute").value;
  const period = document.getElementById("timePeriod").value;
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const addr = document.getElementById("customerAddress").value.trim();

  const paddedHour = String(hour).padStart(0, "0");
  const paddedMinute = String(minute).padStart(0, "0");
  const formattedTime = `${paddedHour}:${paddedMinute} ${period}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const selectedProblemElement = document.querySelector(
    ".problem-option.selected"
  );
  let min = 200,
    max = 400;
  if (selectedProblemElement) {
    min = parseInt(selectedProblemElement.dataset.min || 200);
    max = parseInt(selectedProblemElement.dataset.max || 400);
  }
  const base = 500;
  const minTotal = base + min;
  const maxTotal = base + max;
  const estimated = `${minTotal} - ${maxTotal} PHP`;

  // populate receipt fields
  document.getElementById("receiptRepairerName").textContent = document.getElementById("modalRepairerName").textContent;
  document.getElementById("receiptRepairerCategory").textContent = document.getElementById("modalRepairerCategory").textContent;
  document.getElementById("receiptRepairerPhoto").src = document.getElementById("modalRepairerPhoto").src;
  document.getElementById("receiptRepairerPhoto").alt = document.getElementById("modalRepairerName").textContent;
  document.getElementById("receiptDateTime").textContent = `${formattedDate} at ${formattedTime}`;
  document.getElementById("receiptService").textContent = selectedProblemText;
  document.getElementById("receiptContact").textContent = `${name} • ${phone}`;
  document.getElementById("receiptPayment").textContent = selectedPaymentMethod;
  document.getElementById("receiptTotal").textContent = estimated;

  // close review modal & booking modal, show final receipt
  closeModal("reviewModal");
  closeModal("bookingModal");

  document.getElementById("receiptModal").classList.add("active");
  document.body.style.overflow = "hidden";

  // Here you could also save booking to localStorage or send to server
  // Example: localStorage.setItem('lastBooking', JSON.stringify({ ... }));
}

// reuse closeModal for receipt done button
document
  .querySelectorAll(".modal-back-button")
  .forEach((btn) =>
    btn.addEventListener("click", () => closeModal("bookingModal"))
  );


// initialize DOMContentLoaded for card Book buttons (in case some were added dynamically)
document.addEventListener("DOMContentLoaded", function () {
  // attach card book buttons (redundant but safe)
  const bookButtons = document.querySelectorAll(".book-btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // If a different handler was attached through onclick attribute, that's fine; this ensures consistent behavior
      const card = this.closest(".repairer-card-item");
      const name = card.querySelector(".repairer-name").textContent;
      const category = card.querySelector(".repairer-category").textContent;
      const rating = card.querySelector(".repairer-rating").textContent;
      const photo = card.querySelector(".repairer-photo").src;
      openBookingModal(name, category, rating, photo);
    });
  });

  // wire up any modal-level buttons if needed
});
