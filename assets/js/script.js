var searchBtnEl = $("#search-btn");
var cityName = $("#city-name");
var currCityName = $("#city-name-value");
var apiKey = "d182817e86d3db8ccd08526926fc37ac";
var currTempVal = $("#temp-val");

// Function to capture the city input provided by the user and create URL to make API call
function getCityWeather() {
   console.log(cityName);
    console.log("in get city weather");
    var cityNameVal = cityName.val();
    currCityName.text(cityNameVal);
    console.log(cityNameVal);
    var requestCordURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityNameVal + "&limit="+ 1 +"&appid="+ apiKey;
    getCoordAPI(requestCordURL); 
}

// Function to get the coordinates of a location
function getCoordAPI(requestCordURL) {
    var latitudeVal;
    var longitudeVal;
    fetch(requestCordURL)
        .then(function(response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (coordResp) {
            console.log(coordResp);
            for(var i=0; i < coordResp.length; i++) {
                latitudeVal = coordResp[i].lat;
                longitudeVal = coordResp[i].lon;
                console.log("lat: "+latitudeVal);
                console.log("lon: "+longitudeVal);
            }
            var reqWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitudeVal +"&lon="+ longitudeVal +"&exclude=hourly,daily&units=imperial&appid="+ apiKey;
            console.log(reqWeatherURL);
            getCurrWeather(reqWeatherURL);
        });
}

// Function to get the current weather report for the city input by user
function getCurrWeather(reqWeatherURL) {
    console.log("in getCurrWeather"+reqWeatherURL);
    fetch(reqWeatherURL)
        .then(function(response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (weatherResp) {
            console.log(weatherResp);
            for (var key in weatherResp) {
                if(key === "current") {
                    console.log("inside if");
                    var currentObj = weatherResp[key];
                    console.log(currentObj);
                    currTempVal.text(currentObj.temp+"°F");
                    var tempVal = currentObj.temp;
                    var humidityVal = currentObj.humidity;
                    var windVal = currentObj.wind_speed;
                    var UVindex = currentObj.uvi;
                    console.log(tempVal+ ", " + humidityVal+ ", "+windVal+", "+UVindex);
                }
                console.log(key);
            }
        });
}

// Event Listener
searchBtnEl.on('click', getCityWeather);


