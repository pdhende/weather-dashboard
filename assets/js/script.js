var searchBtnEl = $("#search-btn");
var cityName = $("#city-name");
var currCityName = $("#city-name-value");
var apiKey = "d182817e86d3db8ccd08526926fc37ac";
var currTempVal = $("#temp-val");
var currWindVal = $("#wind-val");
var currHumidityVal = $("#humidity-val");
var currUVIndVal = $("#uv-val");
var forecastTbl1 = $("#day-1");
var cityNameVal;

// Function to capture the city input provided by the user and create URL to make API call
function getCityWeather() {
   console.log(cityName);
    console.log("in get city weather");
    cityNameVal = cityName.val();
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
            // Get the coordinates of the location 
            for(var i=0; i < coordResp.length; i++) {
                latitudeVal = coordResp[i].lat;
                longitudeVal = coordResp[i].lon;
                console.log("lat: "+latitudeVal);
                console.log("lon: "+longitudeVal);
            }
            var reqWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitudeVal +"&lon="+ longitudeVal +"&exclude=minutely,hourly&units=imperial&appid="+ apiKey;
            // var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ latitudeVal +"&lon="+ longitudeVal +"&units=imperial&appid="+ apiKey;
            console.log(reqWeatherURL);
            getCurrWeather(reqWeatherURL);
            // getForcastWeather(forecastURL);
        });
}

// Function to get the current weather report for the city input by user
function getCurrWeather(reqWeatherURL) {
    console.log("in getCurrWeather"+reqWeatherURL);
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
            console.log(response.status);
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (weatherResp) {
            console.log(weatherResp);
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
                    console.log(weatherObj.length);
                    console.log(tempVal+", "+windVal+", "+humidityVal+", "+uviVal+", ");
                    console.log(weatherObj.icon);
                    weatherObj.forEach(function(obj) {
                        console.log(obj.icon);
                        iconType = obj.icon;
                        getIconURL = "http://openweathermap.org/img/wn/"+iconType+".png";
                    });
                    
                    // Append the Icon(image) to the header
                    currCityName.text(cityHeader);
                    var imgIcon = $('<img>');
                    imgIcon.attr('src',getIconURL);
                    currCityName.append(imgIcon);

                    // Set the values of the weather in the table
                    currTempVal.text(tempVal);
                    currWindVal.text(windVal);
                    currHumidityVal.text(humidityVal);
                    currUVIndVal.text(uviVal);
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

    console.log(forecastObj);
    for(var i =1; i < 7; i++) {
        var dateValue = moment.unix(forecastObj[i].dt).format("M/DD/YYYY");
        var tempValue = forecastObj[i].temp.max;
        var weatherObjVal = forecastObj[i].weather;
        var windVal = forecastObj[i].wind_speed;
        var humidVal = forecastObj[i].humidity;
        weatherObjVal.forEach(function(obj) {
            console.log(obj.icon);
            var wIcon = obj.icon;
            wIconURL = "http://openweathermap.org/img/wn/"+wIcon+".png";
        });
        console.log(wIconURL);
        console.log(tempValue);

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

// Event Listener
searchBtnEl.on('click', getCityWeather);


