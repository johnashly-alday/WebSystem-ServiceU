<?php
    header("Content-Type: application/json");
    include("conn.php");

    $data = json_decode(file_get_contents("php://input"), true);

    $required_fields = [
        "repairer_fullName",
        "repairer_gender",
        "repairer_email",
        "repairer_password",
        "repairer_address",
        "repairer_phoneNum",
        "repairer_expertise"
    ];

    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            echo json_encode(["success" => false, "message" => "Missing field: $field"]);
            exit;
        }
    }

    $fullName = $data["repairer_fullName"];
    $gender = $data["repairer_gender"];
    $email = $data["repairer_email"];
    $password = password_hash($data["repairer_password"], PASSWORD_DEFAULT);
    $address = $data["repairer_address"];
    $phone = $data["repairer_phoneNum"];
    $expertise = $data["repairer_expertise"];

    $sql = "INSERT INTO repairers (repairer_fullName, repairer_gender, repairer_email, repairer_password, repairer_address, repairer_phoneNum, repairer_expertise)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $fullName, $gender, $email, $password, $address, $phone, $expertise);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Repairer registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
    }

    $stmt->close();
    $conn->close();
?>
