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


// create gauge chart
function buildGaugeChart(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0];
        var wash_freq = sampleSelected.wfreq;

        var data = [
            {
              type: "indicator",
              mode: "gauge",
              title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 16 } },
              gauge: {
                axis: { range: [null, 9]},
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
})};

buildGaugeChart(940);


// update all plots when dropdown option is selected
// onchange="optionChanged(this.value)

// add options for dropdown
// id="selDataset"

// init function (default data):
// populate the drop down menu (id = selDataset)
// loop through data and append an option for each sample name
// call buildBarChart and buildMetadata on the first value in samples.json (940)

// optionChanged: call buildBarChar and buildMetadata on the new sample
