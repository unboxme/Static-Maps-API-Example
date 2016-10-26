/**
 * Created by Pavel on 26/10/2016.
 */

var APIKey = "API_KEY";
var id;

function determineUserLocation() {
    var output = document.getElementById("locationLabel");

    function success(position) {
        var date = new Date();

        var coordinates = position.coords;
        var latitude = coordinates.latitude;
        var longitude = coordinates.longitude;
        var coordinatesString = latitude + "," + longitude;

        var currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        console.log("Location updated | " +  currentTime);

        output.innerHTML = "<p>Latitude: " + latitude +
            "° <br>Longitude: " + longitude + "°</p>" +
            "<p>UPD: " + currentTime + "</p>";

        var mapImage = new Image();
        mapImage.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=15&size=600x300&sensor=false" +
            "&center=" + coordinatesString +
            "&markers=color:red|" + coordinatesString +
            "&key=" + APIKey;

        output.appendChild(mapImage);
    }

    function failure(error) {
        output.innerHTML = error.message;
        console.warn("Error(" + error.code + "): " + error.message);
    }

    var options = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
    };

    output.innerHTML = "Watching.. Otherwise see console.";
    console.log("Watching location");
    id = navigator.geolocation.watchPosition(success, failure, options);
}

