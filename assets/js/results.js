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
    const urlCoordinates = `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`;

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
