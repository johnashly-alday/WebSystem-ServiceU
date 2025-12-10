<?php
    header("Content-Type: application/json");
    include("conn.php");

    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT * FROM customers WHERE customer_email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['customer_password'])) {
            echo json_encode([
                "success" => true,
                "userType" => "customer",
                "user" => $user
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
            exit;
        }
    }

    $sql2 = "SELECT * FROM repairers WHERE repairer_email = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("s", $email);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows > 0) {
        $repairer = $result2->fetch_assoc();
        if (password_verify($password, $repairer['repairer_password'])) {
            echo json_encode([
                "success" => true,
                "userType" => "repairer",
                "user" => $repairer
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
            exit;
        }
    }

    echo json_encode(["success" => false, "message" => "No account found with this email"]);
?>
