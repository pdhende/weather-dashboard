# Weather Dashboard

## Table of contents
* [Description](#description)
* [Screenshots](#screenshots)
* [Built with](#built-with)
* [How it works](#how-it-works)
* [Application URL](#application-url)

## Description
  The weather dashboard is a versatile web application which provides weather information of the selected city. The application is equipped with the capability to display the current weather details, the weather forecast for the following 5 days and search history of the cities input by the user.
  
## Screenshots

Main Page
|-----|
![Weather-dashboard-main-page](https://user-images.githubusercontent.com/65467469/153334974-d9ef872d-826a-41f0-bf5f-b00ba7867b00.png)

Validation message
|-----|
![Weather-dashboard-validation](https://user-images.githubusercontent.com/65467469/153335028-2e9efec1-47bc-40c0-987d-4dc0ea1b7c5e.png)

## Built with
This application is built using :
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* Third Party API – Open Weather API

## How it works
* Open the Weather Dashboard application.
   * The page has 3 sections: 
   * A form section to accept ‘City Name’ as user input
   * A section to display the current weather details 
   * A section to display the weather forecast for the next 5 days
* When the user clicks on ‘Search’ button without the input
	 * An error message “Please enter city name” is displayed
* When the user enters city name
	* The current weather details are displayed – City name, date, weather icon, temperature, wind speed, humidity and UV index.
	* The UV index is color coded based on the conditions such as favorable, moderate and severe
	* The weather forecast for the next 5 days is displayed with details such as the date, weather icon, temperature, wind speed and humidity.
	* The city name is saved in the local storage and as is displayed as a button below the input form
* When the user clicks on the 'City' button
	* The current weather details of the city selected are displayed
	* The 5 day weather forecast of the city are displayed
	
## Application URL
The deployed application url is :
https://pdhende.github.io/weather-dashboard/

