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

// create gauge chart
function buildGaugeChart(sampleNumber) {
    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0];
        var wash_freq = sampleSelected.wfreq;
        var titleString = "Belly Button Washing Frequency";
        var boldString = titleString.bold();

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: parseFloat(wash_freq),
              type: "indicator",
              mode: "gauge+number",
              title: { text: `${boldString}<br>Scrubs per Week"`, font: { size: 16 } },
              gauge: {
                axis: { range: [0, 9]},
                steps: [
                  { range: [0, 1], color: 'rgba(248,243,236,255)'},
                  { range: [1, 2], color: 'rgba(244,241,228,255)'},
                  { range: [2, 3], color: 'rgba(233,231,201,255)'},
                  { range: [3, 4], color: 'rgba(229,232,176,255)'},
                  { range: [4, 5], color: 'rgba(213,229,153,255)'},
                  { range: [5, 6], color: 'rgba(183,205,143,255)'},
                  { range: [6, 7], color: 'rgba(139,192,134,255)'},
                  { range: [7, 8], color: 'rgba(137,188,141,255)'},
                  { range: [8, 9], color: 'rgba(132,181,137,255)'}
                ],
                text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
                value: 'text',
                textinfo: 'text',
                textposition: 'inside',
                hoverinfo: wash_freq
                }
              }
          ];
          
          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "black", family: "Arial" }
          };
          
          Plotly.newPlot('gauge', data, layout);
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
        // call bar chart, bubble chart and meta data on the first value in samples.json
        buildBarChart(idNumber[0]);
        buildBubbleChart(idNumber[0]);
        buildMetaData(idNumber[0]);
        buildGaugeChart(idNumber[0]);
    })
};
    
// create event handler call optionChanged when new drop down item is selected
d3.selectAll("#selDataset").on("change", optionChanged);
// optionChanged: update all plots when dropdown option is selected
function optionChanged(sampleNumber) {
    var dropdownMenu = d3.select("#selDataset");
    var selectedOption = dropdownMenu.property("value");
    buildBarChart(selectedOption);
    buildBubbleChart(selectedOption);
    buildMetaData(selectedOption);
    buildGaugeChart(selectedOption);
}; 

init();