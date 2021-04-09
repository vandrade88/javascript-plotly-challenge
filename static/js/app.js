// create horizontal bar chart with dropdown menu
function buildBarChart(sampleNumber) {
    d3.json("./samples.json").then((data) => {
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
    })
};

// create bubble chart that display each sample
function buildBubbleChart(sampleNumber) {
    d3.json("./samples.json").then((data) => {
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
    })
};

// display individual's demographic data
function buildMetaData(sampleNumber) {
    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0]; 
        // display key-value pairs from metadata JSON object
        var metadata_object = d3.select("#sample-metadata");
        metadata_object.html("");
        Object.entries(sampleSelected).forEach(([key, value]) => {
            metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
};

// init function
function init() {
    // populate the drop down menu (id = selDataset) with ID number options inside drop down
        d3.json("./samples.json").then((data) => {
            var dropdownMenu = d3.select("#selDataset");
            var idNumber = data.names;
            idNumber.forEach(function(item) {
                var idList = dropdownMenu.append("option");
                idList.attr("value",item);
                idList.text(item);
        })
        // call bar chart, bubble chart and meta data on the first value in samples.json (940) DONE
        buildBarChart(idNumber[0]);
        buildBubbleChart(idNumber[0]);
        buildMetaData(idNumber[0]);
    })
};
    
// create event handler call optionChanged when new drop down item is selected
d3.selectAll("#selDataset").on("change", optionChanged);
// optionChanged: update all plots when dropdown option is selected
function optionChanged(sampleNumber) {
    var dropdownMenu = d3.select("#selDataset");
    var selectedOption = dropdownMenu.property("value");
    buildBarChart(sampleNumber);
    buildBubbleChart(sampleNumber);
    buildMetaData(sampleNumber);
}; 

init();