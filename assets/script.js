
var weatherContainerEl = document.querySelector("#currentWeather");
var temperatureEl = document.querySelector("#temperatureEl");
var humidityEl = document.querySelector("#humidityEl");
var nameEl= document.querySelector("#displayName");
var windSpeedEl = document.querySelector("#windSpeedEl")
var searchButton = document.querySelector("#searchButton");




function getCurrentWeather() {


    var cityName = document.querySelector("#cityInput").value;


    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d82bfc455a2993361e5a198ea2592aaa&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            return response.json()
        })

        .then(function(data) {
            
            var name = document.createElement("h3");
            name.textContent = cityName;
            //add in date and the icondata[0].weather.icon
            nameEl.appendChild(name);

            var temperature = document.createElement("p");
            temperature.textContent = 'Temperature: ' + data.main.temp + '°F';
            temperatureEl.appendChild(temperature);

            var humidity = document.createElement("p");
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
            humidityEl.appendChild(humidity);

            var windSpeed = document.createElement("p");
            windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
            windSpeedEl.appendChild(windSpeed);
        

            weatherContainerEl.className = "current";

            weatherContainerEl.appendChild(temperatureEl)
            weatherContainerEl.appendChild(humidityEl);
            weatherContainerEl.appendChild(windSpeedEl)

            
        
        })
    }


//   function getSearchVal() {
//       var searchValue = document.querySelector
//   }
//     //get serach value = doc.selector.value
//     function searchWeather (searchValue) {
//         //
//     }

//     function getForecast(searchValue) {}
//     function getUVIndex(lat&lon) {}
//     //get forecast funciton (serachValue)
//     //get uvindex (lat & long)



    
           
  searchButton.addEventListener("click", getCurrentWeather)