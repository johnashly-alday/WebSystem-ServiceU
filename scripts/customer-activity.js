const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".category-section");
const cancelModal = document.getElementById("cancelModal");
const ratingModal = document.getElementById("ratingModal");
const successModal = document.getElementById("successModal");
let selectedRating = 0;
let currentTechnician = "";
let currentService = "";

// Tab click functionality
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    let filter = tab.dataset.filter;

    sections.forEach((sec) => {
      if (filter === "all" || sec.dataset.status === filter) {
        sec.style.display = "block";
      } else {
        sec.style.display = "none";
      }
    });
  });
});

// Collapsible categories
function toggleCategory(header) {
  const icon = header.querySelector(".category-icon");
  const content = header.nextElementSibling;

  icon.classList.toggle("collapsed");
  content.style.display = icon.classList.contains("collapsed")
    ? "none"
    : "block";
}

// Cancel Modal Handling
function showCancelModal() {
  cancelModal.classList.add("active");
}

function closeCancelModal() {
  cancelModal.classList.remove("active");
}

function confirmCancel() {
  alert("Booking cancelled.");
  closeCancelModal();
}

cancelModal.addEventListener("click", (e) => {
  if (e.target === cancelModal) closeCancelModal();
});

// Rating Modal Handling
function showRatingModal(technicianName, serviceType) {
  currentTechnician = technicianName;
  currentService = serviceType;

  document.getElementById("technicianName").textContent = technicianName;
  document.getElementById("serviceType").textContent = serviceType;

  // Reset rating
  selectedRating = 0;
  document.querySelectorAll(".star").forEach((star) => {
    star.classList.remove("active");
  });
  document.getElementById("ratingComment").value = "";
  document.getElementById("submitRatingBtn").disabled = true;

  ratingModal.classList.add("active");
}

function closeRatingModal() {
  ratingModal.classList.remove("active");
}

function setRating(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, index) => {

    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });

  // Enable submit button if rating is selected
  document.getElementById("submitRatingBtn").disabled = false;
}

function submitRating() {
  const comment = document.getElementById("ratingComment").value;

  if (selectedRating === 0) {
    alert("Please select a rating");
    return;
  }

  // Close rating modal and show success modal
  closeRatingModal();

  // Small delay for smooth transition
  setTimeout(() => {
    successModal.classList.add("active");
  }, 300);
}

// Success Modal Functions
function closeSuccessModal() {
  successModal.classList.remove("active");
  // Redirect to customer dashboard
  window.location.href = "customer-dashboard.html";
}

// Close rating modal when clicking outside
ratingModal.addEventListener("click", (e) => {
  if (e.target === ratingModal) closeRatingModal();
});

// Close success modal when clicking outside
successModal.addEventListener("click", (e) => {
  if (e.target === successModal) closeSuccessModal();
});
