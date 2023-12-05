const forecast = document.querySelector('.forecast');
homebtn = forecast.querySelector('#home');
cardDiv = forecast.querySelector('.forecast-cards');
list = forecast.querySelector('.packing-recommendation');

const lat = localStorage.getItem('lat');
const lon = localStorage.getItem('lon');
const city = localStorage.getItem('city');

const API_KEY = localStorage.getItem('API_Key');

let api;

const packingList = JSON.parse(localStorage.getItem('packingList'));
console.log(packingList);


function getForecastData() {
    api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`;

    fetch(api).then(response => response.json()).then(results => {
        const sevenDayForecast = results.list.map(forecast => {
            // Create a structured object for each day
            return {
                dt: forecast.dt, // Unix timestamp
                main: forecast.temp, // Assuming temp is the temperature object
                weather: forecast.weather, // Weather array
                humidity: forecast.humidity // Humidity
            };
        });

        console.log(sevenDayForecast);
        // Clear existing content
        cardDiv.innerHTML = '';

        // Create and insert cards for each forecast day
        sevenDayForecast.forEach(forecastItem => {
            cardDiv.insertAdjacentHTML('beforeend', createCard(forecastItem));
        });
    });
}

// Adjusted createCard function
const createCard = (forecastItem) => {
    return ` <li class="card">
                    <h3>${getWeekday(new Date(forecastItem.dt * 1000))}</h3>
                    <img src="${getIcon(forecastItem.weather[0].id)}" />
                    <h6>Temp: ${Math.floor(forecastItem.main.day)}°C</h6>
                    <h6>Humidity: ${forecastItem.humidity}%</h6>
                </li>`;
};

function getWeekday(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

function getIcon(weatherId) {
if (weatherId >= 200 && weatherId <= 232) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/lightning-bolt.png';
    } else if (weatherId >= 300 && weatherId <= 321) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/rain.png';
    } else if (weatherId >= 500 && weatherId <= 531) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/rain.png';
    } else if (weatherId >= 600 && weatherId <= 622) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/snow.png';
    } else if (weatherId >= 701 && weatherId <= 781) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/partly-cloudy-day.png';
    } else if (weatherId === 800) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/sun.png';
    } else if (weatherId >= 801 && weatherId <= 804) {
        return 'https://img.icons8.com/nolan/128/1A6DFF/C822FF/cloud.png';
    }

}

function updatePackingList(cityName, packing) {
    list.innerHTML = '';

    return ` <div class="packing-recommendation">
            <h2>Packing Recommendations:</h2>

            <h3>Before traveling to ${cityName} pack the following:</h3>
                  <ul id="list">
                   <li>${packing[0]}</li>
                   <li>${packing[1]}</li>
                   <li>${packing[2]}</li>
                </ul>`
   
}


getForecastData();
list.insertAdjacentHTML('beforeend', updatePackingList(city, packingList));


homebtn.addEventListener('click', () => {
    window.location.href = "index.html";
});