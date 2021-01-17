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

//this function has been created for the forecast function
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//used for the Last updated part:
function updated(date){
let updated=now.getDate();
let hours=now.getHours();
if (hours<10){
  hours=`0${hours}`;
}
let minutes=now.getMinutes();
if (minutes<10){
  minutes=`0${minutes}`;
}
return `${hours}:${minutes}`;
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
  document.querySelector("#sunrise").innerHTML=new Date(response.data.sys.sunrise * 1000);
  document.querySelector("#sunset").innerHTML=new Date (response.data.sys.sunset*1000);
  //try to convert the sunrise and sunset time (above) with *1000
  // need to make it like: 13:20:



  let iconElement=document.querySelector("#emoji-current-weather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  }



  function displayForecast (response){
  let forecastElement = document.querySelector("#forecast");
  //this null thing it is to avoid to add 5 more days under
  //our 5 days again and again each time we ask for a new city
  forecastElement.innerHTML = null;
  let forecast = null;

  //here we will add a "for" loop, to avoid to repeat 5 times
  //the same thing (=forecast)
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    //+= means we want the innerHTML here PLUS what we will write under it
    forecastElement.innerHTML += `
    <div class="col-2">
      <h6 class="forecast-for-3hours">
        ${formatHours(forecast.dt * 1000)}
      </h6>
      <img class="forecast-icons"
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°C
        </strong>
        <br/>
        ${Math.round(forecast.main.temp_min)}°C
      </div>
    </div>
  `;
  }
  }

function defaultCity(cityInput){
  let apiKey= "a156c6c640df016853c05d9f7e81abef"; 
  let units = "metric";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);

  //we make another api call to display the forecast for 
  //the next 3 hours
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
   //remove the active class from the link
   celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5 +32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature); 
}

function convertToCelsius(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(".current-temperature");
  fahrenheitLink.classList.remove("active");
   celsiusLink.classList.add("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  
}



let dateElement=document.querySelector(".todayDate");
let now= new Date();
dateElement.innerHTML= currentDate(now);

let dateUpdated=document.querySelector("#updated");
let updatedDate= new Date();
dateUpdated.innerHTML= updated(now);


let dateUpdated1=document.querySelector("#sunset");
let updatedDate1= new Date();
dateUpdated1.innerHTML= updated(now);



let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let buttonCurrentLocation= document.querySelector(".button-current-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

defaultCity("London");



