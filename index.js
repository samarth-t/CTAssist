var app = angular.module("myApp",[])
app.controller("reportController",function ($scope) {
    $scope.selectedStation ="";
    //$scope.stations= ["Kimball", "Kedzie", "Francisco", "Rockwell", "Western", "Damen", "Montrose", "Irving Park", "Addison", "Paulina", "Southport", "Belmont", "Wellington", "Diversey", "Fullerton", "Armitage", "Sedgwick", "Chicago", "Merchandise Mart", "Washington/Wells", "Quincy", "Harold Washington Library-State/Van Buren", "Washington/Wabash", "Clark/Lake","O’Hare", "Rosemont", "Cumberland", "Harlem (O'Hare branch)", "Jefferson Park", "Addison", "Logan Square", "Western (O’Hare branch)", "Clark/Lake", "Jackson", "UIC-Halsted", "Illinois Medical District", "Kedzie-Homan", "Forest Park","Ashland/63rd", "Halsted", "Cottage Grove", "King Drive", "Garfield", "51st", "47th", "43rd", "Indiana", "35th-Bronzeville-IIT", "Cermak-McCormick Place", "Roosevelt", "Washington/Wabash", "Clark/Lake", "Clinton", "Morgan", "Ashland", "California", "Kedzie", "Conservatory-Central Park Drive", "Pulaski", "Cicero", "Laramie", "Central", "Harlem/Lake (via Marion entrance)","Midway", "Pulaski", "Kedzie", "Western", "35/Archer"]
    //$scope.stations=[“Austin”, “Harlem/Lake”, “Pulaski”, “Quincy”, “Davis”, “Belmont”, “Jackson”, “Sheridan”, “Damen”, “Morse”, “35th/Archer”, “51st”, “Dempster-Skokie”, “Pulaski”, “LaSalle/Van Buren”, “Ashland”, “Oak Park”, “Sox-35th”, “Damen”, “Western (Forest Park Branch)”, “Cumberland”, “79th”, “Kedzie-Homan”, “State/Lake (Loop 'L')”, “Main”, “Central”, “Ashland/63rd”, “Indiana”, “Western”, “Division”, “Grand”, “Berwyn”, “UIC-Halsted”, “Southport”, “Washington”, “Clark/Lake”, “Forest Park”, “Noyes”, “Cicero”, “Clinton”, “California”, “95th/Dan Ryan”, “Merchandise Mart”, “Racine”, “Cicero”, “Grand”, “Garfield”, “Foster”, “Diversey”, “Wilson”, “Irving Park”, “Jackson”, “California”, “54th/Cermak”, “Damen”, “Kostner”, “Ridgeland”, “Clark/Division”, “North/Clybourn”, “Armitage”, “Western (O'Hare Branch)”, “Adams/Wabash”, “Dempster”, “Laramie”, “Chicago”, “Cottage Grove”, “Washington/Wells”, “Western”, “Harlem”, “Granville”, “Lawrence”, “Central Park”, “Monroe”, “Sedgwick”, “Illinois Medical District”, “Rosemont”, “18th”, “South Boulevard”, “Harold Washington Library-State/Van Buren”, “Francisco”, “Thorndale”, “O'Hare”, “Howard”, “63rd”, “Pulaski”, “Midway”, “Halsted”, “Pulaski”, “Cicero”, “Harlem (Forest Park Branch)”, “69th”, “Cermak-Chinatown”, “Rockwell”, “Logan Square”, “Polk”, “Kedzie”, “Linden”, “Ashland”, “Kedzie”, “47th”, “Monroe”, “35th-Bronzeville-IIT”, “Halsted”, “King Drive”, “Kedzie”, “Clinton”, “Garfield”, “Kedzie”, “Jarvis”, “Argyle”, “Wellington”, “Fullerton”, “47th”, “Addison”, “Central”, “Austin”, “43rd”, “Jefferson Park Transit Center”, “Kimball”, “Loyola”, “Paulina”, “Belmont”, “Montrose”, “LaSalle”, “Oak Park”, “California”, “Bryn Mawr”, “Roosevelt”, “Chicago”, “Addison”, “87th”, “Addison”, “Chicago”, “Irving Park”, “Western”, “Harrison”, “Montrose”, “Morgan”, “Lake”, “Conservatory-Central Park Drive”, “Oakton-Skokie”, “Cermak-McCormick Place”, “Washington/Wabash"];
    temp = ["Austin", "Harlem/Lake", "Pulaski", "Quincy", "Davis", "Belmont", "Jackson", "Sheridan", "Damen", "Morse", "35th/Archer", "51st", "Dempster-Skokie", "Pulaski", "LaSalle/Van Buren", "Ashland", "Oak Park", "Sox-35th", "Damen", "Western (Forest Park Branch)", "Cumberland", "79th", "Kedzie-Homan", "State/Lake (Loop L)", "Main", "Central", "Ashland/63rd", "Indiana", "Western", "Division", "Grand", "Berwyn", "UIC-Halsted", "Southport", "Washington", "Clark/Lake", "Forest Park", "Noyes", "Cicero", "Clinton", "California", "95th/Dan Ryan", "Merchandise Mart", "Racine", "Cicero", "Grand", "Garfield", "Foster", "Diversey", "Wilson", "Irving Park", "Jackson", "California", "54th/Cermak", "Damen", "Kostner", "Ridgeland", "Clark/Division", "North/Clybourn", "Armitage", "Western (OHare Branch)", "Adams/Wabash", "Dempster", "Laramie", "Chicago", "Cottage Grove", "Washington/Wells", "Western", "Harlem", "Granville", "Lawrence", "Central Park", "Monroe", "Sedgwick", "Illinois Medical District", "Rosemont", "18th", "South Boulevard", "Harold Washington Library-State/Van Buren", "Francisco", "Thorndale", "OHare", "Howard", "63rd", "Pulaski", "Midway", "Halsted", "Pulaski", "Cicero", "Harlem (Forest Park Branch)", "69th", "Cermak-Chinatown", "Rockwell", "Logan Square", "Polk", "Kedzie", "Linden", "Ashland", "Kedzie", "47th", "Monroe", "35th-Bronzeville-IIT", "Halsted", "King Drive", "Kedzie", "Clinton", "Garfield", "Kedzie", "Jarvis", "Argyle", "Wellington", "Fullerton", "47th", "Addison", "Central", "Austin", "43rd", "Jefferson Park Transit Center", "Kimball", "Loyola", "Paulina", "Belmont", "Montrose", "LaSalle", "Oak Park", "California", "Bryn Mawr", "Roosevelt", "Chicago", "Addison", "87th", "Addison", "Chicago", "Irving Park", "Western", "Harrison", "Montrose", "Morgan", "Lake", "Conservatory-Central Park Drive", "Oakton-Skokie", "Cermak-McCormick Place", "Washington/Wabash"];
    $scope.stations = temp.filter(function(item, pos) {
        return temp.indexOf(item) == pos;
    })
    console.log($scope.stations)
});


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
        zoom: 15,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        preserveViewport: false,
        polylineOptions: {
            strokeColor: 'purple'
        }
    });
    directionsRenderer2 = new google.maps.DirectionsRenderer({
        map: map,
        preserveViewport: false,
        polylineOptions: {
            strokeColor: 'blue'
        }
    });
    directionsRenderer3 = new google.maps.DirectionsRenderer({
        map: map,
        preserveViewport: false,
        polylineOptions: {
            strokeColor: 'blue'
        }
    });

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
        navigator.geolocation.getCurrentPosition(calculateStartCoordinate);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    current_latitude = position.coords.latitude;
    current_longitude= position.coords.longitude;
}

function calculateEndCoordinate(){
    json_data = httpGet("http://api.positionstack.com/v1/forward?access_key=d501510d46cc578596539c210f600de8&query="+ document.getElementById("DestinationTextField").value)
    console.log(json_data)
    json_data= JSON.parse(json_data);
    end_latitude=json_data.data[0].latitude;
    console.log("End", end_latitude)
    end_longitude=json_data.data[0].longitude;
}

function calculateStartCoordinate(){
    json_data = httpGet("http://api.positionstack.com/v1/forward?access_key=d501510d46cc578596539c210f600de8&query="+ document.getElementById("StartTextField").value)
    console.log(json_data)
    json_data= JSON.parse(json_data);
    console.log(json_data)
    current_latitude=json_data.data[0].latitude;
    console.log("Start", current_latitude)
    current_longitude=json_data.data[0].longitude;
}


function renderRouteTrain(point1_lat,point1_long,point2_lat,point2_long) {
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

function renderRouteWalk(point1_lat,point1_long,point2_lat,point2_long,renderer) {
    var start = new google.maps.LatLng( point1_lat, point1_long)
    var end = new google.maps.LatLng( point2_lat, point2_long)
    var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            renderer.setDirections(result);
        }
    });
}


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function build_path(){
    let result_json;
    calculateStartCoordinate();
    calculateEndCoordinate();
    result_json = restApiCall();
    let point1_lat=  result_json["start"][0];
    let point1_long= result_json["start"][1];
    let point2_lat=  result_json["end"][0];
    let point2_long= result_json["end"][1];
    renderRouteTrain(point1_lat,point1_long,point2_lat,point2_long);
    renderRouteWalk(current_latitude,current_longitude,point1_lat,point1_long,directionsRenderer2);
    renderRouteWalk(point2_lat,point2_long,end_latitude,end_longitude,directionsRenderer3);
}

function restApiCall(){
    //return result_json = JSON.parse(httpGet("https://thingproxy.freeboard.io/fetch/http://3.130.138.187:8080/CTAssist?currentLocationLat=41.8858&currentLocationLong=-87.8316&destinationLocationLat="+end_latitude+"&destinationLocationLong="+end_longitude));
    return result_json = JSON.parse(httpGet("https://thingproxy.freeboard.io/fetch/http://3.130.138.187:8080/CTAssist?currentLocationLat="+current_latitude+"&currentLocationLong="+current_longitude+"&destinationLocationLat="+end_latitude+"&destinationLocationLong="+end_longitude));

}


function report(){


}
