// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// //Alternate method of map object allows adding more properties
// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// // //Original marker 
// //  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// //Alternate method of adding circle
// //  Add a marker to the map for Los Angeles, California.
// let marker = L.circle([34.0522, -118.2437], {
// 	color: 'black',
// 	fillColor: 'yellow',
// 	radius:300
// }).addTo(map);

// // Add a circle to the map
// L.circleMarker([34.0522, -118.2437],{
// 	radius:300,
// 	color: 'black',
// 	fillcolor: '#ffffa1'
// }).addTo(map);

// //Alternate tile layer
// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.streets',
// 	accessToken: API_KEY
// });

// //Moved this array to the cities.js file
// // An array containing each city's location, state, and population.
// let cities = [{
// 	location: [40.7128, -74.0059],
// 	city: "New York City",
// 	state: "NY",
// 	population: 8398748
//   },
//   {
// 	location: [41.8781, -87.6298],
// 	city: "Chicago",
// 	state: "IL",
// 	population: 2705994
//   },
//   {
// 	location: [29.7604, -95.3698],
// 	city: "Houston",
// 	state: "TX",
// 	population: 2325502
//   },
//   {
// 	location: [34.0522, -118.2437],
// 	city: "Los Angeles",
// 	state: "CA",
// 	population: 3990456
//   },
//   {
// 	location: [33.4484, -112.0740],
// 	city: "Phoenix",
// 	state: "AZ",
// 	population: 1660272
//   }

//   ];


// Get data from cities.js
let cityData = cities;

// //removed after moving cities array to cities.js file
// // Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
// 	console.log(city)
//    });

// // Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
// 	console.log(city)
// 	L.marker(city.location).addTo(map);
// });

// //Original marker before adding population as circle size
// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
// 	console.log(city)
// 	L.marker(city.location)
// 	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// 	.addTo(map);
// });


// Add a circle to the map
L.circleMarker([34.0522, -118.2437],{
	radius:300,
	color: 'black',
	fillcolor: '#ffffa1',
}).addTo(map);

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
	console.log(city)
	L.circleMarker(city.location, {
		radius: (city.population -200000)/100000,
		color: '#FF8C00',
		fillcolor: '#FFA500',
		lineWeight: 4
	})
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
	.addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
