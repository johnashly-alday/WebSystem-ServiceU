<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost";
$user = "root";
$pass = "";
$db = "ServiceU";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  echo json_encode(["status"=>"error","message"=>"DB connection failed"]);
  exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
  echo json_encode(["status"=>"error","message"=>"No JSON received","raw"=>$raw]);
  exit;
}

$sql = "INSERT INTO bookings 
(repairer_name, category, problem, booking_date, booking_time, customer_name, customer_phone, customer_address, payment_method, estimated_price)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
  "ssssssssss",
  $data['repairer_name'],
  $data['category'],
  $data['problem'],
  $data['booking_date'],
  $data['booking_time'],
  $data['customer_name'],
  $data['customer_phone'],
  $data['customer_address'],
  $data['payment_method'],
  $data['estimated_price']
);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success"]);
} else {
  echo json_encode(["status"=>"error","message"=>$stmt->error]);
}

$stmt->close();
$conn->close();
?>
