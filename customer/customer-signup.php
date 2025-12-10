<?php
session_start();
$error = isset($_GET['error']) ? $_GET['error'] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../img/logo.png">
    <title>Customer Sign Up</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .form-container {
            background-color: #ffffff;
            padding: 30px 40px;
            border-radius: 8px;
            width: 100%;
            max-width: 900px;
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
        }

        .logo {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin: 0 auto 10px;
            display: block;
        }

        h1 {
            color: #137594;
            font-size: 45px;
            margin: 0 0 5px 0;
        }

        p {
            color: #666;
            font-size: 14px;
            margin: 0;
        }

        .section h2 {
            font-size: 16px;
            color: #555;
            margin: 0 0 20px 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 20px;
            margin-bottom: 25px;
        }

        .form-field {
            display: flex;
            flex-direction: column;
        }

        .form-field.full-width {
            grid-column: 1 / -1;
        }

        label {
            margin-bottom: 5px;
            font-weight: 600;
            color: #444;
            font-size: 12px;
        }

        input,
        select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .complete-btn {
            background-color: #137594;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.2s;
        }

        .error-message {
            background-color: #ffdddd;
            color: #cc0000;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            text-align: center;
        }

        .terms {
            text-align: center;
            font-size: 11px;
            margin-top: 15px;
            color: #666;
        }

        .terms a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="header">
            <img class="logo" src="../img/logo.png" alt="">
            <h1>SERVICE - U</h1>
            <p>Let's get to know you!</p>
        </div>

        <?php if($error != ''): ?>
            <div class="error-message"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form action="../api/customer_register.php" method="POST">
            <div class="section">
                <h2>Customer Signup</h2>

                <div class="form-grid">
                    <div class="form-field">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" name="customer_fullName" placeholder="Enter your full name" required>
                    </div>

                    <div class="form-field">
                        <label for="phone-number">Phone Number</label>
                        <input type="tel" id="phone-number" name="customer_phoneNum" placeholder="Enter your phone number" required>
                    </div>

                    <div class="form-field">
                        <label for="gender">Gender</label>
                        <select id="gender" name="customer_gender" required>
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-field">
                        <label for="email-address">Email Address</label>
                        <input type="email" id="email-address" name="customer_email" placeholder="Enter your email address" required>
                    </div>

                    <div class="form-field">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="customer_password" placeholder="Enter your password" required>
                    </div>

                    <div class="form-field">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="customer_confirm_password" placeholder="Confirm your password" required>
                    </div>

                    <div class="form-field full-width">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="customer_address" placeholder="Enter your address">
                    </div>
                </div>
            </div>

            <div class="footer">
                <button type="submit" class="complete-btn">Complete</button>
                <p class="terms">By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
            </div>
        </form>
    </div>
</body>
</html>
