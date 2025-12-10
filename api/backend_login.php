<?php
session_start();
include("conn.php"); // adjust path to your conn.php if needed

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["username"];
    $password = $_POST["password"];

    // ---- Check Customer ----
    $sql = "SELECT * FROM customers WHERE customer_email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $customer = $result->fetch_assoc();
        if (password_verify($password, $customer["customer_password"])) {
            $_SESSION["user_id"] = $customer["customer_id"];
            $_SESSION["user_type"] = "customer";
            $_SESSION["user_name"] = $customer["customer_fullName"];
            header("Location: ../customer/customer-dashboard.html"); // <-- fixed path
            exit;
        } else {
            $_SESSION["error"] = "Incorrect password.";
            header("Location: ../login.php"); // make sure login.php path is correct
            exit;
        }
    }

    // ---- Check Repairer ----
    $sql2 = "SELECT * FROM repairers WHERE repairer_email = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("s", $email);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows > 0) {
        $repairer = $result2->fetch_assoc();
        if (password_verify($password, $repairer["repairer_password"])) {
            $_SESSION["user_id"] = $repairer["repairer_id"];
            $_SESSION["user_type"] = "repairer";
            $_SESSION["user_name"] = $repairer["repairer_fullName"];
            header("Location: ../repairer/repairer-dashboard.html"); // <-- fixed path
            exit;
        } else {
            $_SESSION["error"] = "Incorrect password.";
            header("Location: ../login.php");
            exit;
        }
    }

    // ---- If no account found ----
    $_SESSION["error"] = "No account found with this email.";
    header("Location: ../login.php");
    exit;
}
?>
