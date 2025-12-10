<?php
    include("conn.php");

    $name = "John Doe";
    $email = "test@gmail.com";
    $password = "123456";

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO customers (customer_fullName, customer_email, customer_password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "Test user inserted successfully!\n";
        echo "Email: $email\n";
        echo "Password: $password\n";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>
