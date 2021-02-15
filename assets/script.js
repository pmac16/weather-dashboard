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

//search variable
var searchEl=document.querySelector('#searchResults')

//function to display current weather 
function getCurrentWeather(event) {

  event.preventDefault();

  //clear the input field
  weatherForecastEl.innerHTML="";
   
  var cityName = document.querySelector("#cityInput").value;
   
    
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d82bfc455a2993361e5a198ea2592aaa&units=imperial";

  fetch(apiUrl)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
        
        
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getForecast(cityName, lat, lon);

   
        icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        
        

        //date
        nameEl.textContent = cityName + ' (' + date + ')';
        temperatureEl.textContent = 'Temperature: ' + data.main.temp + '°F';
        humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
        windSpeedEl.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
       
        weatherContainerEl.classList = "current rounded";
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

    var cityButton = document.createElement("button");
    cityButton.textContent= cityName;
    cityButton.className= "row cityButton";
    searchEl.appendChild(cityButton);
    
    
}

function savedSearch(cityName) {
  weatherForecastEl.innerHTML="";

  var data = JSON.parse(localStorage.getItem(`${cityName}`));
   
   icon.setAttribute('src', "https://openweathermap.org/img/w/" + data[0].weather[0].icon + ".png");
   
   //date
   nameEl.textContent = cityName + ' (' + date + ')';
   temperatureEl.textContent = 'Temperature: ' + data[0].temp.day + '°F';
   humidityEl.textContent = 'Humidity: ' + data[0].humidity + '%';
   windSpeedEl.textContent = 'Wind Speed: ' + data[0].wind_speed + 'MPH';
  
   weatherContainerEl.classList = "current rounded";
   weatherContainerEl.appendChild(nameEl);
   weatherContainerEl.appendChild(temperatureEl)
   weatherContainerEl.appendChild(humidityEl);
   weatherContainerEl.appendChild(windSpeedEl)

   //get the UV index 
  
       uvindexEl.textContent = 'UV Index: ' + data[0].uvi;
       weatherContainerEl.appendChild(uvindexEl);

       if (data[0].uvi <2) {
         uvindexEl.classList.add("low");
       } else  if (data[0].uvi <5) {
         uvindexEl.classList.add("moderate")
       } else if (data[0].uvi <7) {
         uvindexEl.classList.add("high")
       } else if (data[0].uvi < 10) {
         uvindexEl.classList.add("very-high")
       } else {
         uvindexEl.classList.add("extreme")
       }

       for (var i = 1; i < 6; i++) {
        var temperature = data[i].temp.day;
        var humidity = data[i].humidity;

        //create a card for each day
        var forecastEl= document.createElement("div");
        forecastEl.classList = "col bg-primary text-white ml-3 mb-3 rounded";
       
        
        
        var dateEl = document.createElement("div");
        dateEl.textContent = date;
        dateEl.className = "heading";
        forecastEl.appendChild(dateEl);

        var iconEl = document.createElement("img");
        iconEl.setAttribute('src', "https://openweathermap.org/img/w/" + data[0].weather[0].icon + ".png");
        forecastEl.appendChild(iconEl);

        var tempEl = document.createElement("div");
        tempEl.textContent= 'Temp: ' + temperature + '°F';
        tempEl.className = "info";
        forecastEl.appendChild(tempEl);

        var humidEl = document.createElement("div");
        humidEl.className = "info";
        humidEl.textContent = 'Humidity: ' + humidity + '%';
        forecastEl.appendChild(humidEl);
        
        weatherForecastEl.appendChild(forecastEl);
    }
  
};

        
function getForecast(cityName, lat,lon) {
    
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
            localStorage.setItem(cityName, JSON.stringify(data.daily))
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
}



$("body").on("click", ".cityButton",function(event) {
  const city=event.target.textContent
  savedSearch(city);
})

searchButton.addEventListener("click", getCurrentWeather)
