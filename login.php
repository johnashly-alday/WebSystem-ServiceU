<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image" href="img/logo">
    <link rel="stylesheet" href="style.css">
    <title>Log In - Service-U</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: #f0f2f5;
        }

        .main-container {
            display: flex;
            gap: 120px;
            align-items: center;
            max-width: 1100px;
            width: 100%;
        }

        .text-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            text-align: center;
        }

        .text-container img {
            width: 240px;
            height: 240px;
            object-fit: contain;
            margin-bottom: 10px;
        }

        .text-container h1 {
            font-size: 60px;
            font-weight: bold;
            color: #137594;
            margin: 0;
            line-height: 1;

        }

        .text-container p {
            font-size: 26px;
            color: #1c1e21;
            margin: 0;
            line-height: 1.3;

        }

        .login-container {
            flex: 0 0 400px;
            background: white;
            border-radius: 8px;
            padding: 20px;
        }

        .login-container form {
            display: flex;
            flex-direction: column;
        }

        .login-container input {
            width: 100%;
            padding: 14px 16px;
            margin-bottom: 12px;
            border: 1px solid #dddfe2;
            border-radius: 6px;
            font-size: 17px;
            font-family: 'Inter', sans-serif;
        }

        .login-container input:focus {
            outline: none;
            border-color: #137594;
            box-shadow: 0 0 0 2px rgba(19, 117, 148, 0.2);
        }

        .login-btn {
            width: 100%;
            background-color: #137594;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 6px;
            font-size: 20px;
            cursor: pointer;
            margin-bottom: 16px;
        }

        .forgot-pass {
            display: flex;
            text-align: left;
            color: black;
            text-decoration: none;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .divider {
            border-top: 1px solid #dadde1;
            margin: 20px 0;
        }


        .dont-have-account {
            text-align: center;
            color: #1c1e21;
            font-size: 15px;
        }

        .sign-up-link {
            color: #137594;
            text-decoration: none;
            font-weight: 600;
        }

        .login-admin {
            text-align: center;
            margin-top: 10px;
            ;
        }

        .login-admin a {
            color: #1c1e21;
            font-size: 15px;
        }

        @media (max-width: 1024px) {
            .main-container {
                flex-direction: column;
                gap: 40px;
            }

            .text-container {
                align-items: center;
                text-align: center;
            }

            .text-container img {
                width: 180px;
                height: 180px;
            }

            .text-container h1 {
                font-size: 48px;
            }

            .text-container p {
                font-size: 22px;
            }

            .login-container {
                flex: none;
                width: 100%;
                max-width: 400px;
            }
        }
    </style>
</head>

<body>
    <div class="main-container">
        <div class="text-container">
            <img src="img/logo" alt="Service-U Logo">
            <h1>SERVICE-U</h1>
            <p>Book Trusted Repairers anywhere effortlessly</p>
        </div>

        <div class="login-container">
            <?php
                if(isset($_SESSION['error'])) {
                    echo '<div class="error">'.$_SESSION['error'].'</div>';
                    unset($_SESSION['error']);
                }
            ?>
            <form action="./api/backend_login.php" method="POST">
                <form action="backend_login.php" method="POST">
                    <input type="text" name="username" placeholder="Username or Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit" class="login-btn"><strong>Log In</strong></button>
            </form>


                <div class="divider"></div>

                <p class="dont-have-account">Don't have an account? <a href="choose_profile.html"
                        class="sign-up-link">Sign Up</a></p>
                <p class="login-admin"><a href="choose_profile.html">Login as administrator</a></p>
            </form>
        </div>
    </div>
</body>

</html>