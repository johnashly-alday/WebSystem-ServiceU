const feedbackModal = document.getElementById("feedbackModal");
const setPriceModal = document.getElementById("setPriceModal");
const profileModal = document.getElementById("profileModal");
const accountInfoModal = document.getElementById("accountInfoModal");
const changePasswordModal = document.getElementById("changePasswordModal");
const confirmDeleteModal = document.getElementById("confirmDeleteModal"); // NEW Modal element
let currentFilter = "all";

// Sample reviews data
const reviews = [
  {
    rating: 4,
    text: "The technician was very kind! He did a great job. Will definitely call again.",
    service: "Component Replacement",
    date: "November 07, 2025",
    timestamp: new Date("2025-11-07"),
  },
];

// Set Price Modal Functions
function openSetPriceModal() {
  if (setPriceModal) {
    setPriceModal.classList.add("is-visible");
  }
}

function closeSetPriceModal() {
  if (setPriceModal) {
    setPriceModal.classList.remove("is-visible");
  }
}

function closeSetPriceModalOutside(event) {
  if (event.target === setPriceModal) {
    closeSetPriceModal();
  }
}

function savePriceSettings() {
  const baseFee = document.getElementById("baseServiceFee").value;
  const minEstimation = document.getElementById("minEstimation").value;
  const maxEstimation = document.getElementById("maxEstimation").value;

  if (!baseFee || !minEstimation || !maxEstimation) {
    alert("Please fill in all price fields");
    return;
  }

  if (parseFloat(minEstimation) >= parseFloat(maxEstimation)) {
    alert("Minimum estimation must be less than maximum estimation");
    return;
  }

  alert(
    `Price settings saved!\nBase Fee: ₱${baseFee}\nEstimation Range: ₱${minEstimation} - ₱${maxEstimation}`
  );
  closeSetPriceModal();
}

// Open Feedback Modal
function openFeedbackModal() {
  if (feedbackModal) {
    feedbackModal.classList.add("is-visible");
    renderReviews();
  }
}

// Close Feedback Modal
function closeFeedbackModal() {
  if (feedbackModal) {
    feedbackModal.classList.remove("is-visible");
  }
}

// Close when clicking outside
function closeFeedbackModalOutside(event) {
  if (event.target === feedbackModal) {
    closeFeedbackModal();
  }
}

// Filter Reviews
function filterReviews(filter) {
  currentFilter = filter;

  // Update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  renderReviews();
}

// Render Reviews
function renderReviews() {
  const reviewsList = document.getElementById("reviewsList");
  let filteredReviews = [...reviews];

  // Apply filters
  if (currentFilter === "newest") {
    filteredReviews.sort((a, b) => b.timestamp - a.timestamp);
  } else if (currentFilter === "5") {
    filteredReviews = filteredReviews.filter((r) => r.rating === 5);
  }

  // Render
  if (filteredReviews.length === 0) {
    reviewsList.innerHTML = '<div class="no-reviews">No reviews found</div>';
    return;
  }

  reviewsList.innerHTML = filteredReviews
    .map(
      (review) => `
                <div class="review-card">
                    <div class="review-stars">
                        ${Array(review.rating)
                          .fill('<i class="fas fa-star"></i>')
                          .join("")}
                    </div>
                    <p class="review-text">${review.text}</p>
                    <div class="review-meta">
                        <span class="review-service">Service: ${
                          review.service
                        }</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
            `
    )
    .join("");
}

// Function to open the main profile modal
function openModal() {
  if (profileModal) {
    profileModal.classList.add("is-visible");
  }
}

// Function to close any modal by its ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("is-visible");
  }
}

// Function to open the Account Information modal
function openAccountInfoModal() {
  closeModal("profileModal"); // Close the first modal
  if (accountInfoModal) {
    accountInfoModal.classList.add("is-visible"); // Open the second modal
  }
}

// Function to open the Change Password modal
function openChangePasswordModal() {
  closeModal("profileModal"); // Close the first modal
  if (changePasswordModal) {
    changePasswordModal.classList.add("is-visible"); // Open the change password modal
  }
}

// NEW Function to open the Delete Account modal
function openConfirmDeleteModal() {
  closeModal("profileModal"); // Close the first modal
  if (confirmDeleteModal) {
    confirmDeleteModal.classList.add("is-visible"); // Open the delete confirmation modal
  }
}

// Function to return from Account Info back to Profile
function returnToProfileModal() {
  closeModal("accountInfoModal");
  openModal(); // Re-open the main profile modal
}

// Function to return from Change Password back to Profile
function returnToProfileFromPassword() {
  closeModal("changePasswordModal");
  openModal(); // Re-open the main profile modal
}

function handleLogout() {
  window.location.href = "../login.php";
  closeModal("profileModal");
}

// NEW Function for handling the final delete action
function handleDeleteAccount() {
  // In a real application, this would involve a secure API call to delete the account
  alert("Account successfully deleted! (Redirecting to homepage/login...)");
  closeModal("confirmDeleteModal");
  // Optionally redirect the user: window.location.href = '/login';
}

// Function to close the modal when clicking outside
function closeModalOutside(event, modalId) {
  const modal = document.getElementById(modalId);
  // If the click target is the modal backdrop itself, close the modal
  if (event.target === modal) {
    // If it's a sub-modal, return to the profile modal instead of just closing it
    if (modalId === "accountInfoModal" || modalId === "changePasswordModal") {
      // Find the appropriate return function
      if (modalId === "accountInfoModal") {
        returnToProfileModal();
      } else if (modalId === "changePasswordModal") {
        returnToProfileFromPassword();
      }
    } else if (modalId === "confirmDeleteModal") {
      // Simply close the confirmation and return to the profile menu
      closeModal("confirmDeleteModal");
      openModal();
    } else {
      closeModal(modalId);
    }
  }
}

// Toggle password visibility
function togglePasswordVisibility(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// Check password strength
function checkPasswordStrength() {
  const password = document.getElementById("newPassword").value;
  const strengthBar = document.getElementById("strengthBarFill");
  const strengthText = document.getElementById("passwordStrength");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthBar.className = "strength-bar-fill";
  strengthText.className = "password-strength";

  if (strength >= 4) {
    strengthBar.classList.add("strong");
    strengthText.classList.add("strong");
    strengthText.textContent = "Strong";
  } else if (strength >= 3) {
    strengthBar.classList.add("medium");
    strengthText.classList.add("medium");
    strengthText.textContent = "Medium";
  } else if (password.length > 0) {
    strengthBar.classList.add("weak");
    strengthText.classList.add("weak");
    strengthText.textContent = "Weak";
  } else {
    strengthText.textContent = "";
  }

  checkPasswordMatch();
}

// Check if passwords match
function checkPasswordMatch() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const matchMessage = document.getElementById("matchMessage");
  const saveBtn = document.getElementById("savePasswordBtn");

  if (confirmPassword.length === 0) {
    matchMessage.textContent = "";
    saveBtn.disabled = true;
    return;
  }

  if (newPassword === confirmPassword) {
    matchMessage.textContent = "✓ Passwords match";
    matchMessage.style.color = "#4CAF50";

    // Enable save button only if password is strong enough
    const strength = calculateStrength(newPassword);
    saveBtn.disabled = strength < 3;
  } else {
    matchMessage.textContent = "✗ Passwords do not match";
    matchMessage.style.color = "#F44336";
    saveBtn.disabled = true;
  }
}

function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

// Save password function
function savePassword() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!currentPassword) {
    alert("Please enter your current password");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match");
    return;
  }

  // In a real app, this would make an API call to update the password
  alert("Password changed successfully!");

  // Clear the form
  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("passwordStrength").textContent = "";
  document.getElementById("strengthBarFill").className = "strength-bar-fill";
  document.getElementById("matchMessage").textContent = "";
  document.getElementById("savePasswordBtn").disabled = true;

  // Return to profile modal
  closeModal("changePasswordModal");
  openModal();
}
