// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object through loop to create markers
    quakes = data.features;
    for (var i = 0; i < quakes.length; i++) {
        var color = "";
        var quake = quakes[i].properties.mag;
        var latlng = [];
        latlng.push(quakes[i].geometry.coordinates[1]);
        latlng.push(quakes[i].geometry.coordinates[0]);
        var place = quakes[i].properties.place;
        console.log(latlng);
        console.log(place);
        // Conditionals for earthquake points
        if (quake >= 5) {
            color = "red";
          }
          else if (quake >= 4 && quake < 5) {
            color = "darkorange";
          }
          else if (quake >= 3 && quake < 4) {
            color = "orange";
          }
          else if (quake >= 2 && quake < 3) {
            color = "gold";
          }
          else if (quake >= 1 && quake < 2) {
            color = "greenyellow";
          }
          else {
            color = "green";
          }
        console.log(color);
        // Add circles to map
        L.circleMarker(latlng, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: quake * 5
        }).bindPopup("<h3>" + place +
      "</h3><hr><p>" + new Date(quakes[i].properties.time) + "</p>").addTo(myMap);
    
}


})

