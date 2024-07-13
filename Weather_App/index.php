<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hamburger {
            display: none;
        }

        .central-content {
            font-size: 2.5em;
        }

        @media (max-width: 520px) {
            .hamburger {
                display: block;
            }

            .navigation .right-side,
            .left-side {
                display: none;
            }

            .central-content {
                font-size: 8vw;
            }

        }
    </style>

</head>

<body class="w-screen h-screen">
    <div class="w-screen h-screen" id="clouds">

        <nav class="navigation z-10 flex justify-between pl-7 pt-7 pr-7 text-green-700 font-extrabold">

            <ul class="right-side">
                <li>Home</li>
            </ul>

            <ul class="left-side flex" id="left_nav">

                <a href="./weather_lite.html">
                    <li class="pr-6">Explore Lite</li>
                </a>

                <a href="./login.html">
                    <li id="Logins" class="pr-6">Login</li>
                </a>

                <a href="./signup.php">
                    <li class="pr-6">SignUp</li>
                </a>
            </ul>


        </nav>


        <div class="central-content text-content my-72 mx-36">Unleash the weather at fingertips</div>
    </div>


    <script>
        window.addEventListener("DOMContentLoaded", () => {
            VANTA.CLOUDS({
                el: "#clouds",
                mouseControls: false,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                sunlightColor: 0x665545,
                speed: 1.09
            })
        })

    </script>
    <script src="menu.js"></script>
</body>

</html>