const apiKey = '1400e48621d01b05cddb115aaf6ead98';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const coordinateUrl = 'http://api.openweathermap.org/geo/1.0/direct?';

async function getCoordinates(location) {
    const locationRequest = await fetch(`${coordinateUrl}q=${location}&appid=${apiKey}`);
    const response = await locationRequest.json();
    return Promise.resolve(
        {
            'lat': response[0]['lat'],
            'longitude': response[0]['lon']
        }
    );
}

async function getWeatherDataOfLoc(location) {
    const coordinate = await getCoordinates(location);
    const weatherData = await fetch(`${weatherUrl}lat=${coordinate.lat}&lon=${coordinate.longitude}&appid=${apiKey}`);
    return weatherData.json();

}

getWeatherDataOfLoc('london')
    .then(weatherDetail => {
        console.log(weatherDetail);
    });