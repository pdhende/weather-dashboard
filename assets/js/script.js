var searchBtnEl = $("#search-btn");
var cityName = $("#city-name");
var currCityName = $("#city-name-value");
var apiKey = "d182817e86d3db8ccd08526926fc37ac";
var currTempVal = $("#temp-val");
var currWindVal = $("#wind-val");
var currHumidityVal = $("#humidity-val");
var currUVIndVal = $("#uv-val");
var forecastTbl1 = $("#day-1");
var cityDisplayEl = $("#city-display");
var errorMsgEl = $("#error-msg");
var cityNameVal;


// Function to capture the city input provided by the user and create URL to make API call
function getCityWeather() {
   
    if(cityName.val() !== "") {
        cityNameVal = cityName.val();
        cityNameVal = cityNameVal.charAt(0).toUpperCase() + cityNameVal.slice(1).toLowerCase();
        cityName.val('');
    }
    var requestCordURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityNameVal + "&limit="+ 1 +"&appid="+ apiKey;
    getCoordAPI(requestCordURL); 
}

// Function to store the city name in local Storage and display it as buttons
function storeCityName(cityNameVal) {
    var savedCities = JSON.parse(localStorage.getItem("savedCityArr")); // Get previously stored cities from local storage
    if(savedCities === null) {
        var newCityObj = [{
            city: cityNameVal
        }];
        localStorage.setItem("savedCityArr",JSON.stringify(newCityObj));
        createButtons(cityNameVal);
    }
    else {
            var cityExists = savedCities.filter(obj => obj.city === cityNameVal);
            if(cityExists.length === 0) {
                var prevObj = savedCities;
                var newCityObj = {
                    city: cityNameVal
                };
                prevObj.push(newCityObj);
                localStorage.setItem("savedCityArr",JSON.stringify(prevObj));
                createButtons(cityNameVal);
            }
    }
}

// Function to get the coordinates of a location
function getCoordAPI(requestCordURL) {
    var latitudeVal;
    var longitudeVal;
    fetch(requestCordURL)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (coordResp) {
            // Get the coordinates of the location 
            for(var i=0; i < coordResp.length; i++) {
                latitudeVal = coordResp[i].lat;
                longitudeVal = coordResp[i].lon;
            }
            var reqWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitudeVal +"&lon="+ longitudeVal +"&exclude=minutely,hourly&units=imperial&appid="+ apiKey;

            getCurrWeather(reqWeatherURL);
        });
}

// Function to get the current weather report for the city input by user
function getCurrWeather(reqWeatherURL) {
    var cityHeader = cityNameVal +" ("+moment().format('M/DD/YYYY')+") "
    var currentObj;
    var cityHeader;
    var iconResponse;
    var tempVal; 
    var windVal;
    var humidityVal;
    var uviVal;
    var iconType;
    var getIconURL;

    fetch(reqWeatherURL)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (weatherResp) {
            // Call function to store city name in Local Storage
            storeCityName(cityNameVal);

            for (var key in weatherResp) {
                //if the property name = current then extract details like temp, wind speed, humidity and UV index
                if(key === "current") {             
                    currentObj = weatherResp[key];
                    tempVal = currentObj.temp+"°F";
                    windVal = currentObj.wind_speed+" MPH";
                    humidityVal = currentObj.humidity+" %";
                    uviVal = currentObj.uvi;

                    //extract the icon value from the weather object
                    var weatherObj = currentObj.weather;
                    weatherObj.forEach(function(obj) {
                        iconType = obj.icon;
                        getIconURL = "http://openweathermap.org/img/wn/"+iconType+".png";
                    });
                    
                    // Append the Icon(image) to the header
                    currCityName.text(cityHeader);
                    var imgIcon = $('<img>');
                    imgIcon.attr('src',getIconURL);
                    currCityName.append(imgIcon);

                    // Set the values of the weather in the table
                    currTempVal.text("Temp: "+tempVal);
                    currWindVal.text("Wind: "+windVal);
                    currHumidityVal.text("Humidity: "+humidityVal);

                    // Create a color coded badge based on UV Index
                    var className;
                    if(uviVal >= 0 && uviVal < 3) {
                        className = "badge badge-success";
                    }
                    else if(uviVal >= 3 && uviVal < 8) {
                        className = "badge badge-warning";
                    }
                    else {
                        className = "badge badge-danger";
                    }
                    var uvBadge = $('<span>');
                    uvBadge.addClass(className);
                    uvBadge.text(uviVal);
                    currUVIndVal.text("UV Index: ");
                    currUVIndVal.append(uvBadge);
                }
                if(key === "daily") {
                    var forecastObj = weatherResp[key];
                    getForcastWeather(forecastObj);
                }
            }
        });
}

// Function to get next 5 days weather forcast
function getForcastWeather(forecastObj) {
    var wIconURL;

    for(var i =1; i < 7; i++) {
        var dateValue = moment.unix(forecastObj[i].dt).format("M/DD/YYYY");
        var tempValue = forecastObj[i].temp.max;
        var weatherObjVal = forecastObj[i].weather;
        var windVal = forecastObj[i].wind_speed;
        var humidVal = forecastObj[i].humidity;
        weatherObjVal.forEach(function(obj) {
            var wIcon = obj.icon;
            wIconURL = "http://openweathermap.org/img/wn/"+wIcon+".png";
        });

        // Construct the value for ID's
        var fcDateId = "#date-val-"+ i;
        var fcIconId = "#w-icon-"+ i;
        var fTempId = "#temp-val-"+ i;
        var fWIndId = "#wind-val-"+ i;
        var fHumidityId = "#humid-val-"+ i;

        // Get the elements using the constructed ID's
        var fDate = $(fcDateId);
        var fIcon = $(fcIconId);
        var fTemp = $(fTempId);
        var fWind = $(fWIndId);
        var fHumidity = $(fHumidityId);

        // Set the values of elements with its respective ID's
        fDate.text(dateValue);
        fIcon.attr('src',wIconURL);
        fTemp.text("Temp: "+tempValue+"°F");
        fWind.text("Wind: "+windVal+" MPH");
        fHumidity.text("Humidity: "+humidVal+" %");
    }
}

//Function to retieve the stored cities and display them as buttons
function getStoredCities() {
    var storedCities = JSON.parse(localStorage.getItem("savedCityArr")); // Get previously stored cities from local storage

    if(storedCities !== null) {
        storedCities.forEach(function(obj) {
            var cityN = obj.city;
            createButtons(cityN);
        });
    }
}

// Function to create city buttons
function createButtons(cityN) {
        var cityBttn = $('<button>');
        cityBttn.addClass("btn btn-secondary btn-lg btn-block city-button");
        cityBttn.text(cityN);
        cityDisplayEl.append(cityBttn);
}

getStoredCities();

// Event Listener
searchBtnEl.on('click', function() {

    var formEL = $('#input-form');
    var errorEl = $('#error-msg');
    // Validate if user has entered city name
    if(cityName.val() === "") {
        errorEl.addClass('text-danger');
        errorEl.text("Please enter city name!");
        formEL.append(errorEl);
    }
    else {
     errorEl.text("");
     getCityWeather();
    }
});

$(document).on('click','.city-button', function() {
    cityNameVal = $(this).text();
    getCityWeather();
});

