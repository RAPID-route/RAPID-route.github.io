var map = L.map('map').setView([2, -25], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker1;
var m1latlng;
var marker2;
var m2latlng;
var line;

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var dbInitLon = document.getElementById("db_init_lon");
var dbInitLat = document.getElementById("db_init_lat");
var dbTargetLon = document.getElementById("db_target_lon");
var dbTargetLat = document.getElementById("db_target_lat");

let altitude = document.getElementById("altitude")
let airspeed = document.getElementById("airspeed")

var dbDate = document.getElementById("db_start_date");
var date = document.getElementById("start_date");
var time = document.getElementById("start_time");
dbDate.innerHTML = date.value.slice(0,4) + date.value.slice(5,7) + date.value.slice(8,10) + time.value.slice(0,2) + time.value.slice(3,5)

document.getElementById("db_airspeed").innerHTML = airspeed.value
document.getElementById("db_altitude").innerHTML = altitude.value

map.on('click', function(e) {
    if(!marker1)
    {
        console.log(e.latlng); // e is an event object (MouseEvent in this case)
        m1latlng = e.latlng;
        marker1 = L.marker(e.latlng, {icon: greenIcon}).addTo(map);
        dbInitLon.innerHTML = Math.round(100 * e.latlng['lng']) / 100
        dbInitLat.innerHTML = Math.round(100 * e.latlng['lat']) / 100
    } else if(!marker2)
    {
        console.log(e.latlng); // e is an event object (MouseEvent in this case)
        m2latlng = e.latlng;
        marker2 = L.marker(e.latlng, {icon: redIcon}).addTo(map);
        dbTargetLon.innerHTML = Math.round(100 * e.latlng['lng']) / 100
        dbTargetLat.innerHTML = Math.round(100 * e.latlng['lat']) / 100
        //line = L.polyline([m1latlng, m2latlng]).addTo(map);
    }
});

let btn = document.getElementById("reset_map");
btn.addEventListener("click", reset);

date.addEventListener("input", updateDate)
time.addEventListener("input", updateDate)
airspeed.addEventListener("input", updateAirspeed)
altitude.addEventListener("input", updateAltitude)

function reset(){
    map.removeLayer(marker1);
    map.removeLayer(marker2);
    marker1 = null;
    marker2 = null;
}

function  updateDate(){
    document.getElementById("db_start_date").innerHTML = date.value.slice(0,4) + date.value.slice(5,7) + date.value.slice(8,10) + time.value.slice(0,2) + time.value.slice(3,5)
}

function  updateAirspeed(){
    document.getElementById("db_airspeed").innerHTML = airspeed.value
}

function  updateAltitude(){
    document.getElementById("db_altitude").innerHTML = altitude.value
}