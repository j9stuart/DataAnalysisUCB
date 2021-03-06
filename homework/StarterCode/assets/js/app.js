// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(healthData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.noHealthInsurance = +data.noHealthInsurance;
      data.poverty = +data.poverty;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.noHealthInsurance)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("g")
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.noHealthInsurance))
        .attr("r", "15");
    
    var textGroup = chartGroup.selectAll("statetext")
        .data(healthData)
        .enter()
        .append("text")
        .attr('class', 'stateText')
        .attr('font-size', "10px")
        .attr("fill", "#000")
        .attr('x', function(d) { return xLinearScale(d.poverty); })
        .attr('y', function(d) { return yLinearScale(d.noHealthInsurance); })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.abbr; });
//         .text(function(d){return d.abbr});
      

    // Step 6: Initialize tool tip
    // ==============================
    //var toolTip = d3.tip()
     // .attr("class", "tooltip")
      //.offset([80, -60])
      //.html(function(d) {
       // return (`${d.abbr}<hr>Health Insurance Status: ${d.noHealthInsurance}<br>Poverty: ${d.poverty}`);
     // });

    // Step 7: Create tooltip in the chart
    // ==============================
    console.log("Hello There!");


    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty(%)");
  });
