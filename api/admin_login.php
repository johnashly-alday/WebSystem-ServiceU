<?php
session_start();
include("conn.php"); // adjust if needed

// Check if POST data exists
if (!isset($_POST['username']) || !isset($_POST['password'])) {
    die("Missing username or password.");
}

$usernameOrEmail = $_POST['username'];
$password = $_POST['password'];

// Search using admin_name OR admin_email
$sql = "SELECT * FROM admin WHERE admin_name = ? OR admin_email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {

    $admin = $result->fetch_assoc();

    // Verify hashed password
    if ($password === $admin['admin_password']) {

        // Save session
        $_SESSION['admin_id'] = $admin['admin_id'];
        $_SESSION['admin_name'] = $admin['admin_name'];

        // Redirect to dashboard inside /admin/
        header("Location: ../admin/admin-dashboard.html");
        exit();
    } else {
        echo "<script>alert('Incorrect password'); window.location.href='../admin/admin-login.php';</script>";
        exit();
    }

} else {
    echo "<script>alert('Admin account not found'); window.location.href='../admin/admin-login.php';</script>";
    exit();
}

$conn->close();
?>
