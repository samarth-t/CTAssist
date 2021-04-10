let map;
let latitude;
let longitude;


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

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("searchTextField"),{
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"]
    });

};

function autoComplete(){
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("searchTextField"),{
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"]
    });
}



var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude= position.coords.longitude;
    console.log(latitude)
    console.log(longitude)
}
