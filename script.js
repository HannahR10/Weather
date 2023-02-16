var key = config.WEATHER_API_KEY;

let weather = {
  
    //Pulls information for city
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid=" 
            + key
        )
        //once it fetches the url read to completion 
        .then((response) => response.json())
        //take data and put into displayweather 
        .then((data) => this.displayWeather(data));
    },
    //Puts all data in and displays on to page
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(temp)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.round(speed) + " m/h";
        document.querySelector(".weather").classList.remove("loading");
        },
    //get content of search bar
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
        }
    };
    //gets content of search bar and gets info
    document.querySelector(".search button")
    .addEventListener("click", function (){
        weather.search()
    });

    //searchs for information for city in search bar when you click enter
    document.querySelector(".search-bar").addEventListener("keyup", function(event){
        if(event.key == "Enter"){
            weather.search();
        }
    }) 
    //sets default city
    weather.fetchWeather("Cincinnati");