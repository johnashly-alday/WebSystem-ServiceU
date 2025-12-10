<?php
    header("Content-Type: application/json");
    include("conn.php"); 

    $data = $_POST; 

    $requiredFields = ["customer_fullName", "customer_phoneNum", "customer_gender", "customer_email", "customer_password"];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            echo json_encode(["success" => false, "message" => "Missing field: $field"]);
            exit();
        }
    }

    $fullName = $data["customer_fullName"];
    $phone = $data["customer_phoneNum"];
    $gender = $data["customer_gender"];
    $email = $data["customer_email"];
    $password = password_hash($data["customer_password"], PASSWORD_DEFAULT);

    $address = isset($data["customer_address"]) ? $data["customer_address"] : null;

    $sqlCheck = "SELECT * FROM customers WHERE customer_email = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    if ($resultCheck->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        exit();
    }

    $sqlInsert = "INSERT INTO customers (customer_fullName, customer_phoneNum, customer_gender, customer_email, customer_password, customer_address) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("ssssss", $fullName, $phone, $gender, $email, $password, $address);

    if ($stmtInsert->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Registration successful",
            "user" => [
                "id" => $stmtInsert->insert_id,
                "fullName" => $fullName,
                "email" => $email
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed"]);
    }


    $stmtCheck->close();
    $stmtInsert->close();
    $conn->close();
    ?>


