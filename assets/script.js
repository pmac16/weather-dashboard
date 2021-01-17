//current weather variables
var weatherContainerEl = document.querySelector("#currentWeather");
var temperatureEl = document.querySelector("#temperatureEl");
var humidityEl = document.querySelector("#humidityEl");
var nameEl= document.querySelector("#displayName");
var dateEl = document.querySelectorAll("#date")
var windSpeedEl = document.querySelector("#windSpeedEl")
var uvindexEl = document.querySelector("#uvindexEl")

//5 day forecast variables
var searchButton = document.querySelector("#searchButton");
var date= moment().format('l');   
var weatherForecastEl = document.querySelector("#weatherForecast");
var forecastTempEl = document.querySelectorAll("#forecastTemp");

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

        console.log(lat)

        var name = document.createElement("h3");
        name.textContent = cityName 
        nameEl.appendChild(name);

        // var displayDate = document.createElement("h3");
        // displayDate.textContent = date
        // dateEl.appendChild(displayDate);

        var icon = document.createElement("img");
        icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        nameEl.appendChild(icon);

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

        //get the UV index 
        var apiUrl= 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=d82bfc455a2993361e5a198ea2592aaa';
        fetch(apiUrl)
          .then(function(response) {
            return response.json();
            

          })
          .then(function(data) {
            
            var uvindex = document.createElement("p");
            uvindex.textContent = 'UV Index: ' + data.value;
            uvindexEl.appendChild(uvindex);
            weatherContainerEl.appendChild(uvindexEl);

            if (data.value <2) {
              uvindex.classList.add("low");
            } else  if (data.value <5) {
              uvindex.classList.add("moderate")
            } else if (data.value <7) {
              uvindex.classList.add("high")
            } else if (data.value < 10) {
              uvindex.classList.add("very-high")
            } else {
              uvindex.classList.add("extreme")
            }

          })
        
    })  
}
        
function getForecast() {
    var cityName = document.querySelector("#cityInput").value;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName  + "&appid=d82bfc455a2993361e5a198ea2592aaa";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            
            //loop over days
            for (var i = 0; i < data.list.length; i++) {
                // var singleDayData = response.list[i];

                //create a card for each day
                var cardEl = document.createElement("card");
                cardEl.classList = "card-body flex-row justify-space-between";
                
                weatherForecastEl.appendChild(cardEl)
            }
            
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
    
}



// function getSearchValue() {
//     var searchValue = document.querySelector("#SearchButton").value
// }
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
searchButton.addEventListener("click", getForecast)