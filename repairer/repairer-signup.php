<?php
session_start();
$error = isset($_GET['error']) ? $_GET['error'] : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image" href="../img/logo">
<title>Repairer Sign Up</title>

<style>
    body {
        font-family: "Inter", sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 40px;
        display: flex;
        justify-content: center;
    }

    .container {
        background: white;
        padding: 40px 60px;
        border-radius: 10px;
        max-width: 900px;
        width: 100%;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }

    /* ---------- HEADER ---------- */
    .header {
        text-align: center;
        margin-bottom: 25px;
    }

    .header img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }

    .header h1 {
        color: #137594;
        font-size: 40px;
        margin: 10px 0 5px;
        font-weight: 700;
    }

    .header p {
        margin: 0;
        color: #777;
    }

    h2 {
        font-size: 20px;
        color: #333;
        margin-top: 40px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 8px;
    }

    /* ---------- FORM GRID ---------- */
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px 30px;
        margin-bottom: 25px;
    }

    .form-field {
        display: flex;
        flex-direction: column;
    }

    .form-field label {
        margin-bottom: 5px;
        font-size: 13px;
        font-weight: 600;
        color: #444;
    }

    .form-field input,
    .form-field select {
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 14px;
    }

    .full-width {
        grid-column: 1 / -1;
    }

    /* ---------- EXPERTISE SECTION ---------- */
    .expertise-list {
        margin: 10px 0 25px;
    }

    .expertise-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        gap: 12px;
    }

    .expertise-item img {
        width: 28px;
        opacity: 0.8;
    }

    .expertise-item label {
        flex-grow: 1;
        font-size: 15px;
    }

    /* ---------- UPLOAD SECTION ---------- */
    .upload-box {
        background: #e0edf2;
        border-radius: 12px;
        padding: 30px;
        text-align: center;
        border: 2px dashed #96b9c5;
        margin-bottom: 20px;
    }

    .upload-box input {
        display: none;
    }

    .upload-box p {
        margin: 10px 0 0;
        color: #555;
        font-size: 14px;
    }


    .btn {
        width: 100%;
        padding: 14px;
        background-color: #137594;
        border: none;
        font-size: 17px;
        color: white;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
    }

    .terms {
        margin-top: 10px;
        text-align: center;
        font-size: 12px;
        color: #666;
    }

    .terms a {
        color: #137594;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
</head>

<body>

<div class="container">

    <!-- Header Section -->
    <div class="header">
        <img src="../img/logo.png" alt="Service-U Logo">
        <h1>SERVICE - U</h1>
        <p>Let's get to know you!</p>
    </div>

    <?php if($error != ''): ?>
        <div class="error-message"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form action="../api/repairer_register.php" method="POST">

        <!-- Personal Information -->
        <h2>Repairer Signup</h2>
        <div class="form-grid">
            <div class="form-field">
                <label>Full Name</label>
                <input type="text" name="repairer_fullName" placeholder="Enter your full name" required>
            </div>

            <div class="form-field">
                <label>Phone Number</label>
                <input type="tel" name="repairer_phoneNum" placeholder="Enter your phone number" required>
            </div>

            <div class="form-field">
                <label>Gender</label>
                <select name="repairer_gender" required>
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-field">
                <label>Email Address</label>
                <input type="email" name="repairer_email" placeholder="Enter your email" required>
            </div>

            <div class="form-field">
                <label>Password</label>
                <input type="password" name="repairer_password" placeholder="Enter your password" required>
            </div>

            <div class="form-field">
                <label>Confirm Password</label>
                <input type="password" name="repairer_confirm_password" placeholder="Confirm your password" required>
            </div>

            <div class="form-field full-width">
                <label>Address</label>
                <input type="text" name="repairer_address" placeholder="Enter your address" required>
            </div>
        </div>

        <!-- Expertise Section -->
        <h2>Select Your Expertise</h2>
        <div class="expertise-list">
            <div class="expertise-item">
                <img src="../img/chip.png" alt="">
                <label>Hardware</label>
                <input type="checkbox" name="repairer_expertise" value="Hardware">
            </div>
            <div class="expertise-item">
                <img src="../img/repairing.png" alt="">
                <label>Plumbing</label>
                <input type="checkbox" name="repairer_expertise" value="Plumbing">
            </div>
            <div class="expertise-item">
                <img src="../img/flash.png" alt="">
                <label>Electrical</label>
                <input type="checkbox" name="repairer_expertise" value="Electrical">
            </div>
        </div>

        <!-- Upload Section (optional) -->
        <h2>Upload Your Documents</h2>
        <p style="color:#666; margin-top:-10px;">Please upload your licenses or certifications to verify your expertise</p>
        <div class="upload-box">
            <label for="file-upload">
                <img src="https://img.icons8.com/?size=100&id=59816&format=png" width="40">
                <p>Choose a file<br><small>PDF, JPG, PNG up to 5MB</small></p>
            </label>
            <input id="file-upload" type="file" name="repairer_documents">
        </div>
        <br>

        <button type="submit" class="btn">Complete</button>
        <p class="terms">
            By continuing, you agree to our <a href="#">Terms of Service</a> and
            <a href="#">Privacy Policy</a>.
        </p>
    </form>

</div>
<script>
    function completeSignup() {
        window.location.href = "../login.php";
    }
</script>

</body>
</html>
