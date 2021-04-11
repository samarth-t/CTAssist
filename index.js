let map;
let current_latitude;
let current_longitude;
let end_latitude;
let end_longitude;
let json_data;

let autocomplete;
const center = { lat: 41.8781, lng: -87.6298};
const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
};


function initMap() {
    getLocation();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298},
        zoom: 12,
    });

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("DestinationTextField"),{
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"]
    });

    var controlDiv = document.getElementById('info-card');
    map.controls[google.maps.ControlPosition.RIGHT].push(controlDiv);

};

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    current_latitude = position.coords.latitude;
    current_longitude= position.coords.longitude;
}
function caclulateEndCoordinate(){

    json_data = httpGet("http://api.positionstack.com/v1/forward?access_key=d501510d46cc578596539c210f600de8&query="+ document.getElementById("DestinationTextField").value)
    json_data= JSON.parse(json_data);
    end_latitude=json_data.data[0].latitude;
    end_longitude=json_data.data[0].longitude;
}


function calcRoute() {
    var start = { lat: current_latitude, lng: current_longitude};
    var end = { lat: end_latitude, lng: end_longitude};
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
