// use d3 to read in samples.json


// create horizontal bar chart with dropdown menu
// id="bar"
function buildBarChart(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var sample_object = data.samples;
        var sampleSelected = sample_object.filter(item => item.id === sampleNumber);
        sampleSelected = sampleSelected[0];
        var sample_values = sample_object.sample_values;
        var otu_ids = sample_object.otu_ids;
        var otu_labels = sample_object.otu_labels;

}

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

buildMetaData(943);

// display key-value pairs from metadata JSON object


// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// add options for dropdown
// id="selDataset"

// init function (default data)
