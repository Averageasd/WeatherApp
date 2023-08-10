const apiKey = '1400e48621d01b05cddb115aaf6ead98';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const coordinateUrl = 'http://api.openweathermap.org/geo/1.0/direct?';

const searchContainer = document.querySelector('.search-container');
const locationNameContainer = document.querySelector('.location-name-container');
const weatherInfos = [...document.querySelectorAll('.weather-info-text')];
searchContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('search-btn')) {
        const query = e.target.parentNode.querySelector('#search_weather');
        loadData(query.value);

    }
});

function loadData(location) {
    locationNameContainer.textContent = location;
    getWeatherDataOfLoc(location)
        .then(showData);
}

function showData(parsedWeatherData) {
    const temp = parsedWeatherData['main']['temp'];
    const humidity = parsedWeatherData['main']['humidity'];
    const cloud = parsedWeatherData['clouds']['all'];
    const windSpeed = parsedWeatherData['wind']['speed'];
    weatherInfos[0].textContent = `temperature: ${temp} Celsius degree`;
    weatherInfos[1].textContent = `Humidity: ${humidity}%`;
    weatherInfos[2].textContent = `Cloud: ${cloud}%`;
    weatherInfos[3].textContent = `Wind speed: ${windSpeed}`;
}

async function getCoordinates(location) {
    const locationRequest = await fetch(`${coordinateUrl}q=${location}&appid=${apiKey}`);
    const response = await locationRequest.json();
    console.log(response);
    return Promise.resolve(
        {
            'lat': response[0]['lat'],
            'longitude': response[0]['lon']
        }
    );
}

async function getWeatherDataOfLoc(location) {
    const coordinate = await getCoordinates(location);
    const weatherData = await fetch(
        `${weatherUrl}lat=${coordinate.lat}&lon=${coordinate.longitude}&units=metric&appid=${apiKey}`
    );

    return weatherData.json();
}


loadData('USA');