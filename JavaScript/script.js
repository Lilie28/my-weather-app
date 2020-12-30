function currentDate(date){
let currentDate=now.getDate();
let hours=now.getHours();
if (hours<10){
  hours=`0${hours}`;
}
let minutes=now.getMinutes();
if (minutes<10){
  minutes=`0${minutes}`;
}

let dayIndex=now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay=days[dayIndex];

let monthIndex=now.getMonth();
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
let currentMonth=months[monthIndex];

return `${currentDay} ${currentDate} ${currentMonth} <br/> ${hours}:${minutes}`;
}


function showWeatherCondition(response){
document.querySelector(".city").innerHTML=response.data.name;
document.querySelector(".current-temperature").innerHTML= Math.round(response.data.main.temp);
document.querySelector("#current-location-name").innerHTML=response.data.name;
  //or we could write it a bit more step by step, probably like this but not sure (this
  //is what I coded):
//let h1 = document.querySelector("h1");
  //let currentTemperature=document.querySelector(".current-temperature");
  //let temperature = Math.round(response.data.main.temp);
  //currentTemperature.innerHTML=`${temperature}`;
  //h1.innerHTML = `${response.data.name}`
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#temp-max").innerHTML=Math.round(response.data.main.temp_max);
  document.querySelector("#temp-min").innerHTML=Math.round(response.data.main.temp_min);
  document.querySelector(".current-weather-description").innerHTML=response.data.weather[0].main;
  //document.querySelector("#sunrise").innerHTML=response.data.sys.sunrise;
  //try to convert the sunrise and sunset time
  let iconElement=document.querySelector("#emoji-current-weather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  }


function defaultCity(cityInput){
  let apiKey= "a156c6c640df016853c05d9f7e81abef"; 
  let units = "metric";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}


function searchCity(event){
  event.preventDefault();
   let cityInput = document.querySelector("#city-input").value;
  //or we could write: 
  //let cityInput=document.querySelector("#city-input");
// cityInput.innerHTML=cityInput.value;
  defaultCity(cityInput);
}


function searchLocation(position) {
  let apiKey = "a156c6c640df016853c05d9f7e81abef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}




function convertToFahrenheit(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(".current-temperature");
  let temperature=temperatureElement.innerHTML;
  temperature=Number(temperature);
  temperatureElement.innerHTML= Math.round((temperature *9)/5+32);
  
}

function convertToCelsius(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(".current-temperature");
  temperatureElement.innerHTML=20;
  
}



let dateElement=document.querySelector(".todayDate");
let now= new Date();
dateElement.innerHTML= currentDate(now);


let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let buttonCurrentLocation= document.querySelector(".button-current-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

defaultCity("London");



