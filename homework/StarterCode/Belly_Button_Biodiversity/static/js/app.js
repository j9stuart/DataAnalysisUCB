function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    var panel_cleared = panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    d3.json("/metadata/" + sample).then((sampleNames) => {
        Object.entries(sampleNames).forEach((entry) => {
          panel_cleared
            .append("option")
            .text(entry)
            .property("value", entry);
        });
        });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = '/samples/'+ sample;
    d3.json(url).then(function(response) {
        var data = response;
        // @TODO: Build a Bubble Chart using the sample data

        // Trace1 for the Bubble Chart Data
        var trace1 = {
          x: data.otu_ids,
          y: data.sample_values,
          text: data.otu_labels,
          mode: 'markers',
          marker: {
             color: data.otu_ids,
             size: data.sample_values
          }
        };
        // data
        var trace_data = [trace1];
        console.log(trace_data);

        // Apply settings to the layout    
        var layout = {
          title: 'Marker Size',
          showlegend: false,
          height: 800,
          width: 800
        };

        // Render the plot to the div with the id "bubble"
        Plotly.newPlot('bubble', trace_data, layout);

        // @TODO: Build a Pie Chart

        // Trace2 for the Pie Chart Data
        console.log(data.otu_labels.slice(0,10));
        var trace2 = {   
            values: data.sample_values.slice(0, 10),
            labels: data.otu_ids.slice(0, 10),
            hoverinfo: data.otu_labels.slice(0, 10),
            type: "pie"
        };

        // data
        var pie_data = [trace2];

        // Apply setting to the layout
        var pie_layout = {
           height: 400,
           width: 500
            };

        // Render the plot to the div with the id "pie"
        Plotly.newPlot("pie", pie_data, pie_layout);

    });
}

function init() {
  
  console.log('Hello World');
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();