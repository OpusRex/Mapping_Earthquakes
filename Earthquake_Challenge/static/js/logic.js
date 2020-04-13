// Accessing Tectonic Plate GeoJSON URL

const tectonicPlateData ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
// Accessing the 7 days earthquake GeoJSON URL
const earthquake7dData ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function styleLine(){
  return {
    color: "#F05E23",
    weight: 3
  };
}


function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

function getColor(magnitude) {
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  let colorIndex = Math.floor(magnitude) ;
  return colors[colorIndex>5 ? 5 : colorIndex];
}

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let map = L.map('mapid',{
  center: [21.229567, -17.282230],
  zoom: 3,
  layers: [streets]
});

let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets,
  Light: light
};

let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();
let overlays = {
  "Tectonic Plates": tectonicPlates,
  Earthquakes: earthquakes
};

L.control.layers(baseMaps, overlays).addTo(map);

let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];

  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColor(i) + '"></i> ' +
    magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
 }
  return div;
};

legend.addTo(map);
d3.json(earthquake7dData).then(function(data){

  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng)
      },
    style:styleInfo
  })
  .bindPopup(function(layer){
      return `Magnitude:${layer.feature.properties.mag}<br>Location: ${layer.feature.properties.place}`;
  }).addTo(earthquakes);
  earthquakes.addTo(map);
});

d3.json(tectonicPlateData).then(function(data){
  L.geoJson(data,{
    style: styleLine
  })
  .addTo(tectonicPlates);
  tectonicPlates.addTo(map);
});