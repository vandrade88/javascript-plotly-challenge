// init function
function init() {
// populate the drop down menu (id = selDataset) with ID number options inside drop down
    d3.json("samples.json").then((data) => {
        var dropdownMenu = d3.select("#selDataset");
        var idNumber = data.names;
        idNumber.forEach(function(item) {
            var idList = dropdownMenu.append("option");
            idList.attr("value",item);
            idList.text(item);
    })
});

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);
  
// This function is called when a dropdown menu item is selected
function getData() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    var data = [];
  
    if (dataset == 'us') {
        data = us;
    }
  
    else if (dataset == 'uk') {
        data = uk;
    }

    else if (dataset == 'canada') {
        data = canada;
    }
  
    // Call function to update the chart. The function of updatePlotly is below
    updatePlotly(data);
}
};

// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// init function (default data):
// populate the drop down menu (id = selDataset)
// loop through data and append an option for each sample name
// call buildBarChart and buildMetadata on the first value in samples.json (940)

// optionChanged: call buildBarChart and buildMetadata on the new sample


// create horizontal bar chart with dropdown menu
function buildBarChart(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var sampleSelected = samples.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0];
        var otu_ids = sampleSelected.otu_ids;
        var otu_labels = sampleSelected.otu_labels;
        var sample_values = sampleSelected.sample_values;

        var barTrace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        var data = [barTrace];

        Plotly.newPlot("bar", data);
})};

buildBarChart(940);

// create bubble chart that display each sample
function buildBubbleChart(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var sampleSelected = samples.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0];
        var otu_ids = sampleSelected.otu_ids;
        var otu_labels = sampleSelected.otu_labels;
        var sample_values = sampleSelected.sample_values;

        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        var data = [bubbleTrace];

        var layout = {
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", data, layout);
})};

buildBubbleChart(940);


// display individual's demographic data
function buildMetaData(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id === sampleNumber);
        sampleSelected = sampleSelected[0];
        // display key-value pairs from metadata JSON object
        var metadata_object = d3.select("#sample-metadata");
        metadata_object.html("");
        Object.entries(sampleSelected).forEach(([key, value]) => {
            metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
}

buildMetaData(940);



// // i think this is how we call to update each plot upon new change, however, we might need to create the function for updating on change
// // Update the restyled plot's values
// function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
// } // "values" which is the x for a pie chart
//    // [newdata] is the new data


// // Use D3 to create an event handler (to detect when something is chosen)
// d3.selectAll("body").on("change", updatePage);
// // on function takes 2 things: 1) the action that is triggering it AND
// // 2) is the function which is the thing to do when the event occurs 


// // since the below is the action we want it to do on change (whenever someone clicks our dropdown
// // menu), then we wrap it in a function so we can use it in event handler above
// function updatePage() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.selectAll("#select_tag").node();
//   // Assign the dropdown menu item ID to a variable
//   var dropdownMenuID = dropdownMenu.id;
//   // Assign the dropdown menu option to a variable
//   var selectedOption = dropdownMenu.value;

//   console.log(dropdownMenuID);
//   console.log(selectedOption);
// }

// init (default plot) is called down below at the end:
init();