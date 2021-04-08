// use d3 to read in samples.json


// create horizontal bar chart with dropdown menu
// id="bar"

// create bubble chart that display each sample
// id="bubble"

// display individual's demographic data
// id="sample-metadata"
function buildMetaData(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id === sampleNumber);

    })
}

// display key-value pairs from metadata JSON object


// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// add options for dropdown
// id="selDataset"

// init function (default data)
