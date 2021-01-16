
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityName");

var formSubmitHandler = function(event) {
    var cityName = nameInputEl.value.trim();
    
    if (cityName) {
        getUserRepos(cityName);
        nameInputEl.value="";
    } else {
        alert("Please enter a city name.");
    }
}
var getUserRepos = function(city) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d82bfc455a2993361e5a198ea2592aaa";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };
  
  getUserRepos("Oakland");

  userFormEl.addEventListener("submit", formSubmitHandler);