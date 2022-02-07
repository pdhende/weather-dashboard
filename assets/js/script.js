var searchBtnEl = $("#search-btn");
var cityName = $("#city-name");
var currCityName = $("#city-name-value");
var apiKey = "d182817e86d3db8ccd08526926fc37ac";
var currTempVal = $("#temp-val");
var currWindVal = $("#wind-val");
var currHumidityVal = $("#humidity-val");
var currUVIndVal = $("#uv-val");
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
                    currentObj = weatherResp[key];
                    tempVal = currentObj.temp+"°F";
                    windVal = currentObj.wind_speed+" MPH";
                    humidityVal = currentObj.humidity+" %";
                    uviVal = currentObj.uvi;
                    var weatherObj = currentObj.weather;
                    console.log(weatherObj.length);
                    console.log(tempVal+", "+windVal+", "+humidityVal+", "+uviVal+", ");
                    console.log(weatherObj.icon);
                    weatherObj.forEach(function(obj) {
                        console.log(obj.icon);
                        iconType = obj.icon;
                        getIconURL = "http://openweathermap.org/img/wn/"+iconType+"@2x.png";
                    });
                    var imgIcon = $('<img>');
                    imgIcon.attr('src','getIconURL');
                    currCityName.append(imgIcon);

                    // getIconAPI(getIconURL);
                    // var iconType = weatherObj.icon;
                    // var getIconURL = "http://openweathermap.org/img/wn/"+iconType+"@2x.png";
                    // console.log("icon URL "+getIconURL);
                    // getIconAPI(getIconURL);
                }

                // for(var keyVal in weatherObj){
                    //     console.log(weatherObj[keyVal]);
                    //     if(weatherObj[keyVal] == "icon") {
                    //         console.log(weatherObj[keyVal].icon);
                    //     }
                    // }
                    // for(var j=0; j < weatherObj.length;j++) {
                    //     console.log(weatherObj[j]);
                    //     if(weatherObj[j] === "icon") {
                    //         console.log(weatherObj[j]);
                    //     }
                    // }
                // if(key === "weather") {
                //     var weatherObj = weatherResp[key];
                //     var iconType = weatherObj.icon;
                //     var getIconURL = "http://openweathermap.org/img/wn/"+iconType+"@2x.png";
                //     console.log("icon URL "+getIconURL);
                //     getIconAPI(getIconURL);
                // }
                // if(iconResponse !== null) {
                //     console.log("icon "+iconResponse);
                // }
            //     if(key === "current") {
            //         currentObj = weatherResp[key];
            //         tempVal = currentObj.temp+"°F"
            //     }
            //     console.log(key);
            // }
            //         currCityName.text(cityHeader);
            //         currTempVal.text(tempVal);
            //         currWindVal.text(currentObj.wind_speed+" MPH");
            //         currHumidityVal.text(currentObj.humidity+" %");
            //         currUVIndVal.text(currentObj.uvi);
            }
        });
    //Function to get the icon from the 
    function getIconAPI(getIconURL) {
            fetch(getIconURL)
            .then(function(response) {
                console.log(response);
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
                })
            .then(function (iconResp) {
                console.log("in icon fetch");
                console.log(iconResp);
                // console.log("iconResp in fetch"+iconResp);
                // return iconResp;
        });
    }
}

// Event Listener
searchBtnEl.on('click', getCityWeather);


