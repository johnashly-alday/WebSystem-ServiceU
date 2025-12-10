<?php
session_start();
include("conn.php"); // DB connection

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validate required fields
    $requiredFields = [
        "repairer_fullName",
        "repairer_phoneNum",
        "repairer_gender",
        "repairer_email",
        "repairer_password",
        "repairer_address",
        "repairer_expertise"
    ];

    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            $_SESSION["error"] = "Missing field: $field";
            header("Location: ../repairer-signup.php");
            exit();
        }
    }

    $fullName = $_POST["repairer_fullName"];
    $phone = $_POST["repairer_phoneNum"];
    $gender = $_POST["repairer_gender"];
    $email = $_POST["repairer_email"];
    $password = password_hash($_POST["repairer_password"], PASSWORD_DEFAULT);
    $address = $_POST["repairer_address"];
    $expertise = $_POST["repairer_expertise"];

    // Check if email already exists
    $sqlCheck = "SELECT * FROM repairers WHERE repairer_email = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    if ($resultCheck->num_rows > 0) {
        $_SESSION["error"] = "Email already exists";
        header("Location: ../repairer-signup.php");
        exit();
    }

    // Insert new repairer
    $sqlInsert = "INSERT INTO repairers (repairer_fullName, repairer_phoneNum, repairer_gender, repairer_email, repairer_password, repairer_address, repairer_expertise) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("sssssss", $fullName, $phone, $gender, $email, $password, $address, $expertise);

    if ($stmtInsert->execute()) {
        $_SESSION["success"] = "Repairer registered successfully. You can now log in.";
        header("Location: ../login.php");
        exit();
    } else {
        $_SESSION["error"] = "Registration failed. Please try again.";
        header("Location: ../repairer-signup.php");
        exit();
    }

    $stmtCheck->close();
    $stmtInsert->close();
    $conn->close();
}
?>
