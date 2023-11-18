//Select Menu
$(document).ready(function() {
    $('select').formSelect();
});

//Fixed Action Button
$(document).ready(function() {
    $('.fixed-action-btn').floatingActionButton();
});

//Tooltips
$(document).ready(function() {
    $('.tooltipped').tooltip();
});

var titleID = document.getElementById("breweryTitle")
var contentID = document.getElementById("breweryContent")

async function getWeatherData(latitude, longitude) {
    const urlCoordinates = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`;

    return fetch(urlCoordinates)
        .then(response => response.json());
}

async function getLocalBreweries(latitude, longitude) {
    const urlCoordinatesBrewery = `https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=10`;

    return fetch(urlCoordinatesBrewery)
        .then(response => response.json());
}

async function getBreweryByCity(city) {
    const urlCity = `https://api.openbrewerydb.org/breweries?by_city=${encodeURIComponent(city)}&per_page=25`;

    return fetch(urlCity)
        .then(response => response.json());
}

function setWebpage(city){
    timer1.innerText = time1;
    temp1.innerText = "Temperature: "+Math.round(dayTemp1);
    wind1.innerText = "Wind: "+ dayWind1;
    humid1.innerText = "Humid: " + dayHumid1;
    timer2.innerText = time2;
    temp2.innerText = "Temperature: "+Math.round(dayTemp2);
    wind2.innerText = "Wind: "+ dayWind2;
    humid2.innerText = "Humid: " + dayHumid2;
    timer3.innerText = time3;
    temp3.innerText = "Temperature: "+Math.round(dayTemp3);
    wind3.innerText = "Wind: "+ dayWind3;
    humid3.innerText = "Humid: " + dayHumid3;
    timer4.innerText = time4;
    temp4.innerText = "Temperature: "+Math.round(dayTemp4);
    wind4.innerText = "Wind: "+ dayWind4;
    humid4.innerText = "Humid: " + dayHumid4;
    timer5.innerText = time5;
    temp5.innerText = "Temperature: "+Math.round(dayTemp5);
    wind5.innerText = "Wind: "+ dayWind5;
    humid5.innerText = "Humid: " + dayHumid5;
}

function getApiWeather(lat,long){
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid=886f3f4f8785854297f7a562176e6a41';
    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
        dayTemp1 = (data.list[5].main.temp - 273.15) * 9/5 + 32;
        dayTemp2 = (data.list[13].main.temp - 273.15) * 9/5 + 32;
        dayTemp3 = (data.list[21].main.temp - 273.15) * 9/5 + 32;
        dayTemp4 = (data.list[29].main.temp - 273.15) * 9/5 + 32;
        dayTemp5 = (data.list[37].main.temp - 273.15) * 9/5 + 32;

        dayWind1 = data.list[5].wind.speed + " MPH";
        dayWind2 = data.list[13].wind.speed + " MPH";
        dayWind3 = data.list[21].wind.speed + " MPH";
        dayWind4 = data.list[29].wind.speed + " MPH";
        dayWind5 = data.list[37].wind.speed + " MPH";

        dayHumid1 = data.list[5].main.humidity + "%";
        dayHumid2 = data.list[13].main.humidity + "%";
        dayHumid3 = data.list[21].main.humidity + "%";
        dayHumid4 = data.list[29].main.humidity + "%";
        dayHumid5 = data.list[37].main.humidity + "%";

        time1 = data.list[5].dt_txt;
        time2 = data.list[13].dt_txt;
        time3 = data.list[21].dt_txt;
        time4 = data.list[29].dt_txt;
        time5 = data.list[37].dt_txt;

        time = data.list[3].dt_txt;
        setWebpage(data.city.name);
    })
}
async function getApiLocation(city){
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid=886f3f4f8785854297f7a562176e6a41'
    fetch(requestURL)
    .then(function(reponse){
        return reponse.json();
    })
    .then(function(data){
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        getApiWeather(latitude,longitude)
    })
}

async function displayBreweryResults(city) {
    try {
        const breweryData = await getBreweryByCity(city);
        const resultsContainer = document.getElementById('breweryResults');
        resultsContainer.innerHTML = '';

        const ulElement = document.getElementById('breweryResults');

        breweryData.forEach(brewery => {
            if (brewery.address_1) {
                const liElement = document.createElement('li');
                liElement.classList.add('collection-item', 'avatar', 'hoverable');

                if (brewery.website_url) {
                    liElement.innerHTML = `
                <i class="material-icons circle">room</i>
                <span class="title">${brewery.name}</span>
                <p>Address: ${brewery.address_1} <br>
                    Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons favorites" data-state="unselected">favorite_border</i></a>
            `;
                } else {
                    liElement.innerHTML = `
                <i class="material-icons circle">room</i>
                <span class="title">${brewery.name}</span>
                <p>Address: ${brewery.address_1} <br>
                    Website: Sorry this brewery doesnt have a website.
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons favorites" data-state="unselected">favorite_border</i></a>
            `;
                }
                ulElement.appendChild(liElement);

                liElement.addEventListener("click",function(){
                    titleID.innerText = brewery.name;
                    if(brewery.website_url){
                        contentID.innerText = "Address: " + brewery.address_1 + "\n" + "Website: " + brewery.website_url;
                    }
                    else{
                        contentID.innerText = "Address: " + brewery.address_1 + "\n" + "Website: No website URL for this Brewery!";
                    }

                    if(brewery.latitude,brewery.longitude){ 
                        getApiWeather(brewery.latitude,brewery.longitude);
                        console.log("this has lonlat")
                    }
                    else{
                        getApiLocation(city);
                        console.log("this does not have lonlat")
                    }     
                })

            } else {
                return;
            }
        });
        $("i.favorites").on("click", function(event) {
            var element = event.target;
            if (element.dataset.state === "unselected") {
                element.dataset.state = "selected";
                element.textContent = "favorite";
            } else {
                element.dataset.state = "unselected";
                element.textContent = "favorite_border";
            };
        });
    } catch (error) {
        console.error('Error fetching brewery data:', error);
    }
}
console.log('Hello World!');

const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');


displayBreweryResults(city);
// hi
