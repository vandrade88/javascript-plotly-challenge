// init function
function init() {
    var data = [{
      values: us,
      labels: labels,
      type: 'pie'
    }];

    var layout = {
        height: 600,
        width: 800
    };
  
    Plotly.newPlot("pie", data, layout);
};


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


// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// add options for dropdown
// id="selDataset"

// init function (default data):
// populate the drop down menu (id = selDataset)
// loop through data and append an option for each sample name
// call buildBarChart and buildMetadata on the first value in samples.json (940)

// optionChanged: call buildBarChar and buildMetadata on the new sample
