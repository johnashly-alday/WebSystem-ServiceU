let currentJobData = {};
let currentTab = "incoming";

// Initial Data Structure for jobs
let incomingJobs = [
  {
    problem: "Replace Component",
    customer: "Tristan Mirano",
    datetime: "Fri, Nov 07, 2025 - 05:26 PM",
    price: "450.00",
    location: "Gulod Labac, Batangas City",
    payment: "Cash",
  },
  {
    problem: "Device Repair",
    customer: "Brent Pagcaliwagan",
    datetime: "Fri, Nov 07, 2025 - 05:26 PM",
    price: "700.00",
    location: "Gulod Labac, Batangas City",
    payment: "Cash",
  },
  {
    problem: "Hardware Restoration",
    customer: "Kenn Philip Silang",
    datetime: "Fri, Nov 07, 2025 - 05:26 PM",
    price: "1200.00",
    location: "Gulod Labac, Batangas City",
    payment: "Cash",
  },
];

let ongoingJobs = [
  // Adding Tristan Mirano to ongoing as per the scenario for testing.
  {
    problem: "Monitor Troubleshooting",
    customer: "Lusi Fernando",
    datetime: "Mon, Dec 08, 2025 - 10:00 AM",
    price: "320.00",
    location: "Gulod Labac, Batangas City",
    payment: "Cash",
  },
];

let cancelledJobs = [];

let completedJobs = [
  // Example of a completed job
  {
    problem: "Software Installation",
    customer: "Jane Doe",
    datetime: "Thu, Nov 06, 2025 - 02:00 PM",
    price: "500.00",
    location: "Gulod Labac, Batangas City",
    payment: "Cash",
  },
];

function getJobIconPath() {
  return `<path d="M9 2C7.89543 2 7 2.89543 7 4V5H6C4.89543 5 4 5.89543 4 7V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7C20 5.89543 19.1046 5 18 5H17V4C17 2.89543 16.1046 2 15 2H9ZM9 4H15V7H9V4ZM6 7H7H9H15H17H18V20H6V7Z"/>`;
}

// Renders job items for a specific list
function renderJobs() {
  document.getElementById("incoming-jobs").innerHTML = incomingJobs
    .map((job) => createIncomingJobItem(job))
    .join("");
  document.getElementById("ongoing-jobs").innerHTML =
    ongoingJobs.length > 0
      ? ongoingJobs.map((job) => createOngoingJobItem(job)).join("")
      : `<p style="text-align: center; color: #9ca3af; padding: 40px;">No ongoing jobs</p>`;
  document.getElementById("completed-jobs").innerHTML =
    completedJobs.length > 0
      ? completedJobs.map((job) => createCompletedJobItem(job)).join("")
      : `<p style="text-align: center; color: #9ca3af; padding: 40px;">No completed jobs</p>`;
  document.getElementById("cancelled-jobs").innerHTML =
    cancelledJobs.length > 0
      ? cancelledJobs.map((job) => createCancelledJobItem(job)).join("")
      : `<p style="text-align: center; color: #9ca3af; padding: 40px;">No cancelled jobs</p>`;
}

// Helper to generate HTML for Incoming Job
function createIncomingJobItem(job) {
  return `<div class="job-item" onclick="openRequestModal('${job.problem}', '${
    job.customer
  }', '${job.datetime}')">
                <div class="job-icon"><img src="../img/chip.png" alt="">${getJobIconPath()}</svg></div>
                <div class="job-info"><div class="job-title">${
                  job.problem
                }</div><div class="job-customer">${job.customer}</div></div>
                <div class="job-arrow">›</div>
            </div>`;
}

// Helper to generate HTML for Ongoing Job (with price and complete button)
function createOngoingJobItem(job) {
  return `<div class="job-item">
                <div class="job-icon"><img src="../img/chip.png" alt="">${getJobIconPath()}</svg></div>
                <div class="job-info"><div class="job-title">${
                  job.problem
                }</div><div class="job-customer">${job.customer}</div></div>
                <div class="job-badges">
                    <span class="price-badge">₱ ${job.price}</span>
                    <button class="complete-badge" onclick="event.stopPropagation(); openCompleteModal('${
                      job.problem
                    }', '${job.customer}', '${job.datetime}', '${
    job.price
  }')">Complete</button>
                </div>
            </div>`;
}

// Helper to generate HTML for Completed Job
function createCompletedJobItem(job) {
  return `<div class="job-item">
                <div class="job-icon" >
                    <img src="../img/chip.png" alt="">
                </div>
                <div class="job-info"><div class="job-title">${job.problem}</div><div class="job-customer">${job.customer}</div></div>
                <div class="job-badges"><span class="price-badge" style="background: #10b981; color: white;">₱ ${job.price}</span></div>
            </div>`;
}

// Helper to generate HTML for Cancelled Job
function createCancelledJobItem(job) {
  return `<div class="job-item">
                <div class="job-icon" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.71 14.29L12 13.5l-3.71 3.79-1.42-1.42L10.58 12 6.87 8.29l1.42-1.42L12 10.58l3.71-3.71 1.42 1.42L13.42 12l3.71 3.71-1.42 1.42z"/>
                    </svg>
                </div>
                <div class="job-info"><div class="job-title">${job.problem}</div><div class="job-customer">${job.customer}</div></div>
            </div>`;
}

// Logic to switch tabs and re-render the appropriate list
function switchTab(tab, element) {
  currentTab = tab;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  element.classList.add("active");
  document.querySelectorAll(".jobs-container").forEach((container) => {
    container.classList.add("hidden");
  });
  document.getElementById(tab + "-jobs").classList.remove("hidden");
  renderJobs(); // Ensure the latest lists are rendered on switch
}

function closeModal(event) {
  if (event.target.classList.contains("modal")) {
    document.getElementById("acceptDeclineModal").classList.remove("active");
    document.getElementById("acceptConfirmModal").classList.remove("active");
    document.getElementById("completeServiceModal").classList.remove("active");
  }
}

// --- Incoming Job Request Modal Functions ---
function openRequestModal(problem, customer, datetime) {
  // Find the full job details based on customer name (assuming unique for simplicity)
  const job = incomingJobs.find((j) => j.customer === customer) || {};
  currentJobData = job; // Store for accept/decline actions

  document.getElementById("modal-problem-request").textContent = problem;
  document.getElementById("modal-customer-request").textContent = customer;
  document.getElementById("modal-datetime-request").textContent = datetime;
  // The location and payment fields are currently static in HTML, but should be updated here if data was available.

  document.getElementById("acceptDeclineModal").classList.add("active");
}

function acceptJob() {
  // 1. Move job from incoming to ongoing
  const jobIndex = incomingJobs.findIndex(
    (j) => j.customer === currentJobData.customer
  );
  if (jobIndex > -1) {
    const acceptedJob = incomingJobs.splice(jobIndex, 1)[0];
    ongoingJobs.push(acceptedJob);

    // 2. Update the Confirmation Modal
    document.getElementById("accepted-customer-name").textContent =
      acceptedJob.customer;
    document.getElementById("accepted-service").textContent =
      acceptedJob.problem;
    document.getElementById("accepted-datetime").textContent =
      acceptedJob.datetime;

    // 3. Close request modal and open confirmation modal
    document.getElementById("acceptDeclineModal").classList.remove("active");
    document.getElementById("acceptConfirmModal").classList.add("active");

    renderJobs(); // Re-render lists
  }
}

function declineJob() {
  // 1. Move job from incoming to cancelled
  const jobIndex = incomingJobs.findIndex(
    (j) => j.customer === currentJobData.customer
  );
  if (jobIndex > -1) {
    const declinedJob = incomingJobs.splice(jobIndex, 1)[0];
    cancelledJobs.push(declinedJob);

    // 2. Close request modal
    document.getElementById("acceptDeclineModal").classList.remove("active");

    renderJobs(); // Re-render lists
  }
}

function closeAcceptModal() {
  document.getElementById("acceptConfirmModal").classList.remove("active");
}

// --- Ongoing Job Complete Modal Functions ---
function openCompleteModal(problem, customer, datetime, price) {
  // Find the full job details based on customer name (assuming unique for simplicity)
  const job = ongoingJobs.find((j) => j.customer === customer) || {};
  currentJobData = job; // Store for complete action

  document.getElementById("modal-problem-complete").textContent = problem;
  document.getElementById("modal-customer-complete").textContent = customer;
  document.getElementById("modal-datetime-complete").textContent = datetime;
  document.getElementById("modal-price-complete").textContent = `₱ ${price}`;

  document.getElementById("completeServiceModal").classList.add("active");
}

function closeCompleteModal() {
  document.getElementById("completeServiceModal").classList.remove("active");
}

function confirmComplete() {
  // 1. Move job from ongoing to completed
  const jobIndex = ongoingJobs.findIndex(
    (j) => j.customer === currentJobData.customer
  );
  if (jobIndex > -1) {
    const completedJob = ongoingJobs.splice(jobIndex, 1)[0];
    completedJobs.push(completedJob);

    // 2. Close the modal
    closeCompleteModal();

    // 3. Re-render the lists
    renderJobs();

    // Optional: Automatically switch to the completed tab to show the new status
    const completedTabButton = document.querySelector(
      ".tab[onclick=\"switchTab('completed', this)\"]"
    );
    if (completedTabButton) {
      switchTab("completed", completedTabButton);
    }
  }
}

// Initial render on load
window.onload = renderJobs;
