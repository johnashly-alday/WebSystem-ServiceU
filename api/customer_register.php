<?php
session_start();
include "conn.php"; // assuming this is in the same folder as backend

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect form data
    $fullName = trim($_POST["customer_fullName"] ?? '');
    $phone = trim($_POST["customer_phoneNum"] ?? '');
    $gender = trim($_POST["customer_gender"] ?? '');
    $email = trim($_POST["customer_email"] ?? '');
    $password = $_POST["customer_password"] ?? '';
    $confirmPassword = $_POST["customer_confirm_password"] ?? '';
    $address = trim($_POST["customer_address"] ?? '');

    // Validate required fields
    if (!$fullName || !$phone || !$gender || !$email || !$password || !$confirmPassword) {
        header("Location: ../customer-signup.php?error=Please fill in all required fields");
        exit;
    }

    // Check password confirmation
    if ($password !== $confirmPassword) {
        header("Location: ../customer-signup.php?error=Passwords do not match");
        exit;
    }

    // Check if email already exists
    $sqlCheck = "SELECT * FROM customers WHERE customer_email = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        header("Location: ../customer-signup.php?error=Email already exists");
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new customer
    $sqlInsert = "INSERT INTO customers (customer_fullName, customer_phoneNum, customer_gender, customer_email, customer_password, customer_address) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("ssssss", $fullName, $phone, $gender, $email, $hashedPassword, $address);

    if ($stmtInsert->execute()) {
        // Success → redirect to login page
        header("Location: ../login.php");
        exit;
    } else {
        // Insert failed
        header("Location: ../customer-signup.php?error=Registration failed. Please try again.");
        exit;
    }

    // Close statements and connection
    $stmtCheck->close();
    $stmtInsert->close();
    $conn->close();
} else {
    // If not POST request, redirect to signup page
    header("Location: ../customer-signup.php");
    exit;
}
