//the date and time
let now = new Date();

let dateTime = document.querySelector("#date-time");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let weekday = days[now.getDay() + 1];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

dateTime.innerHTML = `${day}, ${month} ${date}- ${hours}:${minutes}`;

//let's get the temp to show for the searched city
function currentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#temperature");
  let forecast = document.querySelector("#forecast");
  let description = response.data.weather[0].description;
  let humid = Math.round(response.data.main.humidity);
  let updateHum = document.querySelector("#humid");
  let feelsLike = Math.round(response.data.main.feels_like);
  let updateFeel = document.querySelector("#feels-like");
  let name = document.querySelector("#location");
  name.innerHTML = response.data.name;
  newTemp.innerHTML = `${temp}`;
  forecast.innerHTML = `${description}`;
  updateHum.innerHTML = `Humidity: ${humid}%`;
  updateFeel.innerHTML = `Feels Like: ${feelsLike}°`;
}

function getCurrentCityTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#temperature");
  let forecast = document.querySelector("#forecast");
  let description = response.data.weather[0].description;
  let humid = Math.round(response.data.main.humidity);
  let updateHum = document.querySelector("#humid");
  let feelsLike = Math.round(response.data.main.feels_like);
  let updateFeel = document.querySelector("#feels-like");
  let name = document.querySelector("#location");
  name.innerHTML = response.data.name;
  newTemp.innerHTML = `${temp}`;
  forecast.innerHTML = `${description}`;
  updateHum.innerHTML = `Humidity: ${humid}%`;
  updateFeel.innerHTML = `Feels Like: ${feelsLike}°`;
}

function searchLocation(position) {
  let apiKey = "2d15662f0a607d166c07789453c7a23b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getCurrentCityTemp);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//search bar

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#location");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "2d15662f0a607d166c07789453c7a23b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentTemp);
}
let searching = document.querySelector("#searching");
searching.addEventListener("submit", search);

let currentLoc = document.querySelector("#current-city");
currentLoc.addEventListener("click", getCurrentCity);

//temp conversion
//celcius first

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  let tempC = temperatureDisplay.innerHTML;
  temperatureDisplay.innerHTML = -1;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = 30;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelsius);

//back to fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);
//i learned order is important, i realized i was putting the commands before the functions
