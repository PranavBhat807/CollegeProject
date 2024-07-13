console.log("JS");
const apiKey = "5bc9ca94a2be5846bc9cfecf8676f80f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cardBack = document.querySelector('.card-back');
const foodSuggestion = cardBack.querySelector('ul');
const listings = document.getElementById('listings');
const tempConv = document.querySelector(".temp");
const hamburger = document.getElementById('hamburger');
const popular_dishes = document.getElementById('popular_dishes');
const close_icon = document.getElementById('close');
async function checkWeather(city) {

    gsap.to('.animate-container', {
        y: 800, duration: 1, onComplete: async () => {
            //Fetching the Weather updates from the API Provider
            const response = await fetch(apiURL + city + `&appid=${apiKey}`);
            var data = await response.json();

            //Undefined ke liye
            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                return; // Exit the function if city not found
            }
            //Updating the data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°<span class="conversion">C</span>';
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

            var temp;
            temp = Math.round(data.main.temp);
            tempConv.addEventListener("click", () => {
                var Fahrenheit = Math.round(temp * 9 / 5) + 32;
                let conversionElement = tempConv.querySelector('.conversion');
                if (conversionElement.textContent === 'C') {
                    document.querySelector(".temp").innerHTML = Fahrenheit + '°<span class="conversion">F</span>';
                }
                else {
                    tempConv.innerHTML = temp + '°<span class="conversion">C</span>';
                }

            });


            // Show or hide the bar based on humidity
            document.querySelector(".bar").style.display = parseInt(data.main.humidity) > 50 ? "block" : "none";

            //Updating the image and food suggestions based on weather condition
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    foodSuggestion.innerHTML = '<li>Hot Chocolate</li> <li>Pakoras (Vegetable Fritters)</li> <li>Aloo Tikki Chaat</li> <li>Vegetable Samosas</li> <li>Chicken Tikka Masala</li> <li>Palak Paneer</li> <li>Vegetable Biryani</li> <li>Chicken Noodle Soup</li> <li>Grilled Cheese Sandwich</li>';
                    if (searchBox == '')
                        break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    foodSuggestion.innerHTML = '<li>Fresh Fruit Salad</li> <li>Grilled Chicken Caesar Salad</li> <li>Cold Pasta Salad</li> <li>Caprese Sandwich with Tomato, Mozzarella, and Basil</li> <li>Mango Lassi</li> <li>Masala Grilled Paneer Tikka</li> <li>Vegetable Pulao</li>';
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    foodSuggestion.innerHTML = '<li>Hot Masala Chai</li> <li>Tea/Coffee + Bhajya</li> <li>Grilled sandwich</li> <li>Roasted peanuts</li> <li>Popcorn</li>';
                    // Remove "Drink more water" message
                    document.querySelector(".bar p.weather-sugg").remove();
                    // Add "Take the umbrella" message
                    var umbrellaMessage = document.createElement("p");
                    umbrellaMessage.className = "weather-sugg";
                    umbrellaMessage.textContent = "Take the umbrella";
                    document.querySelector(".bar").appendChild(umbrellaMessage);
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                case "Haze":
                    weatherIcon.src = "images/haze.png";
                    foodSuggestion.innerHTML = '<li>Hot Masala Chai</li> <li>Vegetable Pakoras</li> <li>Chicken Tikka Masala</li> <li>Steamed Momos with Spicy Dip</li> <li>Tom Yum Soup</li> <li>Sushi Rolls</li> <li>Honey Glazed Carrots</li>';
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    foodSuggestion.innerHTML = '<li>Hot Masala Chai</li> <li>Methi Paratha with Yogurt</li> <li>Mushroom Risotto</li> <li>Steamed Momos with Spicy Sauce</li> <li>Vegetable Manchurian</li> <li>Chicken Noodle Soup</li>';
                    break;
                default:
                    weatherIcon.src = "images/snow.png";
                    foodSuggestion.innerHTML = '<li>Hot Chocolate with Marshmallows</li> <li>Tomato Soup with Grilled Cheese Sandwich</li> <li>Chicken Pot Pie</li> <li>Vegetable Stew with Crusty Bread</li> <li>Masala Chai with Samosa</li> <li>Vegetable Biryani</li> <li>Paneer Tikka Masala</li> <li>Pasta Carbonara</li>';
                    break;
            }

            //Weather card ko display karane ke liye
            gsap.to('.animate-container', { y: 10, duration: 1 });
            document.querySelector(".weather").style.display = "block";
        }
    });

}

//Search button me se search karne ke liye
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// JavaScript to toggle the class 'flipped' on click to trigger the flip animation
document.querySelector('.flip-card').addEventListener('click', function (event) {
    // Check if the click is on the input field or the search icon
    if (!event.target.closest('.search') && !event.target.closest('.bar') && !event.target.closest('.temp') && !event.target.closest('.viewMore')) {
        this.classList.toggle('flipped');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.style.display = "none";
    popular_dishes.style.display = "block";
    close_icon.style.display = "block";
});

close_icon.addEventListener('click', () => {
    popular_dishes.style.display = "none";
    hamburger.style.display = "block";
    close_icon.style.display = "none";
});

//Popular dishes
searchBtn.addEventListener("click", () => {
    const listings = document.getElementById('listings');
    fetch('./food.json')
        .then(res => res.json())
        .then(data => {
            // Clear previous list items
            listings.innerHTML = '';

            data.forEach(post => {
                if (post.name.toLowerCase() === searchBox.value.toLowerCase()) {
                    post.popular_dishes.forEach(dish => {
                        const li = document.createElement('li');
                        li.classList.add('list_of_foods');
                        li.textContent = dish;
                        listings.appendChild(li);

                    });
                }
            });
        })
        .catch(error => console.error('Error:', error));
});

