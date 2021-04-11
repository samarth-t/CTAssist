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
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("DestinationTextField"),{
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"]
    });

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("StartTextField"),{
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
        navigator.geolocation.getCurrentPosition(calcualateStartCoordinate);
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
    console.log(json_data)
    end_latitude=json_data.data[0].latitude;
    console.log("End", end_latitude)
    end_longitude=json_data.data[0].longitude;
}

function calcualateStartCoordinate(){
    json_data = httpGet("http://api.positionstack.com/v1/forward?access_key=d501510d46cc578596539c210f600de8&query="+ document.getElementById("StartTextField").value)
    json_data= JSON.parse(json_data);
    console.log(json_data)
    current_latitude=json_data.data[0].latitude;
    console.log("Start", current_latitude)
    current_longitude=json_data.data[0].longitude;
}


function calcRouteTrain(point1_lat,point1_long,point2_lat,point2_long) {
    console.log(point1_long)
    console.log(point1_lat)
    console.log(point2_long)
    console.log(point2_lat)
    var start = new google.maps.LatLng( point1_lat, point1_long)
    var end = new google.maps.LatLng( point2_lat, point2_long)
    var request = {
        origin: start,
        destination: end,
        travelMode: 'TRANSIT'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

function calcRouteWalk(point1_lat,point1_long,point2_lat,point2_long) {
    console.log(point1_long)
    console.log(point1_lat)
    console.log(point2_long)
    console.log(point2_lat)
    var start = new google.maps.LatLng( point1_lat, point1_long)
    var end = new google.maps.LatLng( point2_lat, point2_long)
    var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
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


function build_path(){
    let result_json;
    caclulateEndCoordinate();
    calcualateStartCoordinate();
    result_json = restApiCall();
    let point1_lat=  result_json["start"][0];
    let point1_long= result_json["start"][1];
    let point2_lat=  result_json["end"][0];
    let point2_long= result_json["end"][1];
    //calcRouteTrain(point1_lat,point1_long,point2_lat,point2_long);
    //calcRouteWalk(41.8858,-87.8316,point1_lat,point1_long);
    calcRouteWalk(point2_lat,point1_long,end_latitude,end_longitude);
}

function restApiCall(){
    return result_json = JSON.parse(httpGet("https://thingproxy.freeboard.io/fetch/http://3.130.138.187:8080/CTAssist?currentLocationLat=41.8858&currentLocationLong=-87.8316&destinationLocationLat="+end_latitude+"&destinationLocationLong="+end_longitude));
}
