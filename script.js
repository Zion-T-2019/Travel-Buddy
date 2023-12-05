const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".search-container"),
infoTxt = inputPart.querySelector(".info"),
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img");
arrowBck = wrapper.querySelector("header i");
nxtPage = wrapper.querySelector("header icon");




let api;

inputField.addEventListener("keyup", e => { // if user press any key and release
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});


locationBtn.addEventListener("click", () => { // if user click on the location icon then this block will execute
   if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    } 
});

//document.getElementById('tempSwitch').addEventListener('change', function (e) {
  //  convertTemperature(e.target.checked);
//});

/*function convertTemperature(isFahrenheit) {
    let currentTemp = parseFloat(wrapper.querySelector(".temp .num").innerText);
    let feelsLikeTemp = parseFloat(wrapper.querySelector(".temp .num-2").innerText);

    if (isFahrenheit) {
        // Convert Celsius to Fahrenheit
        currentTemp = (currentTemp * 9 / 5) + 32;
        feelsLikeTemp = (feelsLikeTemp * 9 / 5) + 32;
    } else {
        // Convert Fahrenheit to Celsius
        currentTemp = (currentTemp - 32) * 5 / 9;
        feelsLikeTemp = (feelsLikeTemp - 32) * 5 / 9;
    }

    // Update the UI
    wrapper.querySelector(".temp .num").innerText = Math.floor(currentTemp);
    wrapper.querySelector(".temp .num-2").innerText = Math.floor(feelsLikeTemp);
}*/

function onSuccess(position){ // if user allowed location access then this block will execute
    const { latitude, longitude } = position.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
    fetchWeather();
}
function onError(error){ // if user denied location access then this block will execute
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

const OPEN_WEATHER_API_KEY = "f29e4ab8958e1df49a95314c4d8a990a"; // You can get yours by singing up to openweathermap.org

function requestApi(city) { // requesting api
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
    fetchWeather();
}

function fetchWeather() { // fetching api response and returning it with parsing into js obj and array
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(results => weatherDetails(results));
}

function weatherDetails(info) {
    if (info.cod == "404") { // if user enters city name which is not a real city then this block will execute
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else { // if user enters a real city name then this block will execute
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        const { lat, lon } = info.coord; 

        // Adding weather icon
        if (id == 800) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/sun.png";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/lightning-bolt.png";
        }
        else if (id >= 600 && id <= 622) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/snow.png";
        }
        else if (id >= 701 && id <= 781) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/partly-cloudy-day.png";
        }
        else if (id >= 801 && id <= 804) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/cloud.png";
        }
        else if (id >= 300 && id <= 321) {
            wIcon.src = "https://img.icons8.com/nolan/128/1A6DFF/C822FF/rain.png";
        }

        // Adding data to html
        wrapper.querySelector(".temp .num").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .num-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        // Adding data to local storage
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lon);
        localStorage.setItem("city", city);
       //const isFahrenheit = document.getElementById('tempSwitch').checked;
       //convertTemperature(isFahrenheit);

       

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
        let packingList = populateList({ temp: info.main.temp, description: info.weather[0].description });
        //console.log(packingList);
    }
    
}




arrowBck.addEventListener("click", () => { // removing active class from wrapper and clearing input field
    wrapper.classList.remove("active");
    inputField.value = "";
    infoTxt.innerText = "";
    infoTxt.classList.remove("pending", "error");
});

nxtPage.addEventListener("click", () => { // goes to next page
    localStorage.setItem("API_Key", OPEN_WEATHER_API_KEY);

    window.location.href = "pack.html";
    wrapper.classList.remove("active");
    inputField.value = "";
    infoTxt.innerText = "";
    infoTxt.classList.remove("pending", "error");

});

// Packing List
function populateList(weatherData) {
    let packingList = [];

    // example conditions 
    if (weatherData.temp <= 10) { // cold
        packingList.push("coat", "gloves", "scarf");
    } else if (weatherData.temp > 10 && weatherData.temp <= 20) { // mild
        packingList.push("jacket", "long-sleeve shirts");
    } else if (weatherData.temp > 20) { // warm
        packingList.push("t-shirts", "shorts", "sunscreen");
    }
    if (weatherData.description.includes("rain")) {
        packingList.push("umbrella", "waterproof jacket");
    } else if (weatherData.description.includes("snow")) {
        packingList.push("warm hat", "snow boots");
    }
    localStorage.setItem("packingList", JSON.stringify(packingList));
    return packingList;
}


