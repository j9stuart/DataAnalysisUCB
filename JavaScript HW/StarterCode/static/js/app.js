
// from data.js
var tableData = data;

console.log(tableData);

// YOUR CODE HERE!
// Select the table body variable and declare it here
var tbody = d3.select("tbody");

// Function that runs once the page is opened
function init() {
    tableData.forEach((weatherReport) => {
        var row = tbody.append("tr");
        Object.entries(weatherReport).forEach(([key, value]) => {
          var cell = tbody.append("td");
          cell.text(value);
        });
    });
};

// Select the button and declare it here as submit
var submit = d3.select("#filter-btn");

// Create a function that runs on the click of the button
submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Filter the data.js information for the date provided by the user
  var rightData = tableData.filter(ufoData => ufoData.datetime === inputValue);

  // If the array is empty then tell the user there are no sightings on this date
  // Else then update the table with the information returned
  if (rightData.length == 0) {
      tbody.html("There aren't any sightings reported on this date!");
  }
    else {
        tbody.html("");

        rightData.forEach((weatherReport) => {
            var row = tbody.append("tr");
            Object.entries(weatherReport).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
            });
        });
  };
});

// Run the initial table upon opening the page
init();
  
