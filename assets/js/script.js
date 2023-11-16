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

function goToResults(city) {
    window.open(`results.html?city=${city}`, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.btn-large');

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const cityInputValue = document.getElementById('cityInput').value;
        console.log('City input value:', cityInputValue);
        goToResults(cityInputValue);
    })
})
