var searchBtnEl = $("#search-btn");
var cityName = $("#city-name");
var apiKey = "d182817e86d3db8ccd08526926fc37ac"

// Function to fecth weather data based on the city provided by the user
function getCityWeather() {
   console.log(cityName);
    console.log("in get city weather");
    var cityNameVal = cityName.val();
    console.log(cityNameVal);
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityNameVal + "&appid="+ apiKey;
    getAPI(requestURL);
}

function getAPI(requestURL) {
    fetch(requestURL)
        .then(function(response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
              }
              return response.json();
            })
        .then(function (weaResp) {
            console.log(weaResp);
        })
}

// Event Listener
searchBtnEl.on('click', getCityWeather);


