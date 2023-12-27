var div1 = document.createElement("div");
div1.setAttribute("class", "container");

var div2 = document.createElement("div");
div2.setAttribute("class", "row");

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(countries => {
        countries.forEach(country => {
            
            var div3 = document.createElement("div");
            div3.setAttribute("class", "col-lg-4 col-sm-12");

            var div4 = document.createElement("div");
            div4.setAttribute("class", "card");

            var div5 = document.createElement("div");
            div5.setAttribute("class", "card-header");
            div5.innerHTML = `<h3><marquee>${country.name.common}</marquee></h3>`

            var div6 = document.createElement("div");
            div6.setAttribute("class", "card-body");
            div6.innerHTML = `<img src="${country.flags.png}" width="150px" height="100px"> 
                <p>Capital : ${country.capital}<br>
                 Region : ${country.region}<br>
                 Country Code: ${country.fifa}</p>
                 <button type="button" class="btn btn-primary" onclick="getWeather('${country.latlng[0]}', '${country.latlng[1]}')">Click for weather</button>`;

            div4.append(div5, div6);
            div3.append(div4);
            div2.append(div3);
        });

        div1.append(div2);
        document.body.append(div1);
    })
    .catch(error => console.error("Error fetching countries:", error));

function getWeather(lat, lon) {
    console.log("Clicked! Coordinates:", lat, lon);
    
    var api = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=604bac031cfa5c298ddee2d84ca9da61`);
    api.then(response => response.json())
        .then(data2 => {
            console.log("Weather data:", data2);
            var arr = [];
            arr[0] = data2.main.temp;
            arr[1] = data2.weather[0].main;
            arr[2] = data2.weather[0].description;
            arr[3] = data2.name;
            alert(` Country is: ${arr[3]} \n Temp is: ${arr[0]}°C\n Weather condition is: ${arr[1]}\n Description about weather conditions is ${arr[2]}`);
        })
        .catch(error => console.error("Error fetching weather data:", error));
}
