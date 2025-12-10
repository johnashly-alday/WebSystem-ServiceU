<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "ServiceU";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

mysqli_set_charset($conn, "utf8");
?>
