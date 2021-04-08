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
        var sample = samples.filter(item => item.id == sampleNumber);
        sample = sample[0];
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;
        var sample_values = sample.sample_values;

        var barTrace = {
            y: otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            x: sample_values.slice(0,10).reverse(),
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        Plotly.newPlot("bar", [barTrace]);
})};

buildBarChart(940);

// create bubble chart that display each sample
// id="bubble"


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

// display key-value pairs from metadata JSON object


// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// add options for dropdown
// id="selDataset"

// init function (default data):
// populate the drop down menu (id = selDataset)
// loop through data and append an option for each sample name
// call buildBarChart and buildMetadata on the first value in samples.json (940)

// optionChanged: call buildBarChar and buildMetadata on the new sample
