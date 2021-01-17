// Globa Variables
var searchButton = document.querySelector("#searchButton");
var date= moment().format('l');  

//current weather variables
var weatherContainerEl = document.querySelector("#currentWeather");
var temperatureEl = document.querySelector("#temperatureEl");
var humidityEl = document.querySelector("#humidityEl");
var nameEl= document.querySelector("#displayName");
var dateEl = document.querySelector("#date")
var windSpeedEl = document.querySelector("#windSpeedEl")
var uvindexEl = document.querySelector("#uvindexEl")
var icon = document.querySelector("#icon");

//5 day forecast variables
var weatherForecastEl = document.querySelector("#weatherForecast");
var forecastTempEl = document.querySelector("#forecastTemp");
var heading = document.querySelector("#forecastTitle");

var day1El= document.querySelector('#day1');
var day2El= document.querySelector('#day2');
var day3El= document.querySelector('#day3');
var day4El= document.querySelector('#day4');
var day5El= document.querySelector('#day5');

//function to display current weather 
function getCurrentWeather(event) {
   //somehow save to local storage 

  event.preventDefault();
   
  var cityName = document.querySelector("#cityInput").value;
   //put something if there is nothing typed ==> look at I did in activities
    
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d82bfc455a2993361e5a198ea2592aaa&units=imperial";

  fetch(apiUrl)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
        
        
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getForecast(lat, lon);

        // var icon = document.createElement("img");
        icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        // nameEl.appendChild(icon);
        

        //date
        nameEl.textContent = cityName + ' (' + date + ')';
        temperatureEl.textContent = 'Temperature: ' + data.main.temp + '°F';
        humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
        windSpeedEl.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
       
        weatherContainerEl.className = "bg-light";
        weatherContainerEl.appendChild(nameEl);
        weatherContainerEl.appendChild(temperatureEl)
        weatherContainerEl.appendChild(humidityEl);
        weatherContainerEl.appendChild(windSpeedEl)

        //get the UV index 
        var apiUrl= 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=d82bfc455a2993361e5a198ea2592aaa';
        fetch(apiUrl)
          .then(function(response) {
            return response.json();
            

          })
          .then(function(data) {
            uvindexEl.textContent = 'UV Index: ' + data.value;
            weatherContainerEl.appendChild(uvindexEl);

            if (data.value <2) {
              uvindexEl.classList.add("low");
            } else  if (data.value <5) {
              uvindexEl.classList.add("moderate")
            } else if (data.value <7) {
              uvindexEl.classList.add("high")
            } else if (data.value < 10) {
              uvindexEl.classList.add("very-high")
            } else {
              uvindexEl.classList.add("extreme")
            }

          })
        
    })  
}
        
function getForecast(lat,lon) {
    // var cityName = document.querySelector("#cityInput").value;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + '&lon=' + lon + "&appid=f04424bed1e08dfe10e6a628ec049266&units=imperial";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            
            for (var i = 0; i < 5; i++) {
                var temperature = data.daily[i].temp.day;
                var humidity = data.daily[i].humidity;

                //create a card for each day
                var forecastEl= document.createElement("div");
                forecastEl.classList = "col bg-primary text-white ml-3 mb-3 rounded";
               
                // heading.textContent = '<h3 5 Day Forecast</h3>';
                
                var dateEl = document.createElement("div");
                dateEl.textContent = date;
                dateEl.className = "heading";
                forecastEl.appendChild(dateEl);

                var iconEl = document.createElement("img");
                iconEl.setAttribute('src', "https://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png");
                forecastEl.appendChild(iconEl);

                var temperatureEl = document.createElement("div");
                temperatureEl.textContent= 'Temp: ' + temperature + '°F';
                temperatureEl.className = "info";
                forecastEl.appendChild(temperatureEl);

                var humidityEl = document.createElement("div");
                humidityEl.className = "info";
                humidityEl.textContent = 'Humidity: ' + humidity + '%';
                forecastEl.appendChild(humidityEl);
                
                weatherForecastEl.appendChild(forecastEl);
            }
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
}



searchButton.addEventListener("click", getCurrentWeather)
