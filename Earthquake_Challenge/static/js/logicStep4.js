
// Add console.log to check to see if our code is working.

console.log("working");

console.log('earthquake loading')

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
})

let baseMaps = {
    "Street": streets,
    "Satellite": satelliteStreets
}

let earthquakes = new L.layerGroup();
let overlays = {
    Earthquakes: earthquakes
};

let map  = L.map('mapid',{
    center: [39.5, -98.5], 
    zoom: 3,
    layers : [streets]
})

L.control.layers(baseMaps, overlays).addTo(map)
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    L.geoJson(data,{
        pointToLayer: function(feature, latlng ){
            console.log(data);
            return L.circleMarker(latlng)
        },
        style: styleInfo,
        onEachFeature: function (feature,layer){
            layer.bindPopup("Magnitude: " + feature.properties.mag +
            "<br>Location: " + feature.properties.place + "</br>");
        }

    }).addTo(earthquakes);
    earthquakes.addTo(map)
})

function styleInfo(feature){
    return {
        opacity:1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };

};

function getRadius(magnitude){
    if (magnitude ===0) {
        return 1;
    }
    return magnitude *4;

};

function getColor(magnitude){
    if (magnitude >5){
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";

}