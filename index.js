let map;


//Read Users current location
//Convert to Lat Long

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 12,
    });
}

let autocomplete;
const center = { lat: 41.8781, lng: -87.6298 };
const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
};
function initAutoComplete(){
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteTextField"),{
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"]
    });
}
