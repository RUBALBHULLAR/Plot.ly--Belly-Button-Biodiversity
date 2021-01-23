// function getPlots(id){
//    //Read samples.json
//    d3.json("samples.json").then(sampledata =>
//     {
//         console.log(sampledata)
//         var ids = sampledata.samples[0].otu_ids;
//         console.log(ids)
//         var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
//         console.log(sampleValues)
//         var labels =  sampledata.samples[0].otu_labels.slice(0,10);
//         console.log (labels)
//         // get only top 10 otu ids for the plot OTU and reversing it. 
//         var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
//         // get the otu id's to the desired form for the plot
//         var OTU_id = OTU_top.map(d => "OTU " + d);
//         console.log(`OTU IDS: ${OTU_id}`)
//         // get the top 10 labels for the plot
//         var labels =  sampledata.samples[0].otu_labels.slice(0,10);
//         console.log(`OTU_labels: ${labels}`)
//         var trace ={
//             x: sampleValues,
//             y: OTU_id,
//             text: labels,
//             marker: {
//             color: 'blue'},
//             type:"bar",
//             orientation: "h",
//         };
//         // create data variable
//         var data = [trace];

//         // create layout variable to set plots layout
//         var layout = {
//             title: "Top 10 OTU",
//             yaxis:{
//                 tickmode:"linear",
//             },
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 100,
//                 b: 30
//             }
//         };

//         // create the bar plot
//         Plotly.newPlot("bar", data, layout);

//         // The bubble chart
//         var trace1 = {
//             x: sampledata.samples[0].otu_ids,
//             y: sampledata.samples[0].sample_values,
//             mode: "markers",
//             marker: {
//                 size: sampledata.samples[0].sample_values,
//                 color: sampledata.samples[0].otu_ids
//             },
//             text:  sampledata.samples[0].otu_labels

//         };
//         // set the layout for the bubble plot
//         var layout_2 = {
//             xaxis:{title: "OTU ID"},
//             height: 600,
//             width: 1000
//         };

//         // creating data variable 
//         var data1 = [trace1];

//         // create the bubble plot
//     Plotly.newPlot("bubble", data1, layout_2); 
    
//     });
// }  
// // create the function to get the necessary data
// function getDemoInfo(id) {

//     // read the json file to get data
//     d3.json("samples.json").then((data)=> {

//         // get the metadata info for the demographic panel
//         var metadata = data.metadata;
//         console.log(metadata)

//         // filter meta data info by id
//         var result = metadata.filter(meta => meta.id.toString() === id)[0];
//         // select demographic panel to put data
//         var demographicInfo = d3.select("#sample-metadata");

//         // empty the demographic info panel each time before getting new id info
//         demographicInfo.html("");

//         // grab the necessary demographic data data for the id and append the info to the panel
//         Object.entries(result).forEach((key) => {   
//             demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
//         });
//     });
// }
// // create the function for the change event
// function optionChanged(id) {
//     getPlots(id);
//     getDemoInfo(id);
// }

// // create the function for the initial data rendering
// function init(){
//       // select dropdown menu 
//       var dropdown = d3.select("#selDataset");
    
//     // read the data 
//     d3.json("samples.json").then((data)=> {
//         console.log(data)

//         // get the id data to the dropdwown menu
//         data.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value");
//         });

//         // call the functions to display the data and the plots to the page
//         getPlots(data.names[0]);
//         getDemoInfo(data.names[0]);
//     });
// }

// init();

// populate dropdown
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((samplesData) => {
        samplesData.names.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
        });
        var sampleID = dropdown.property("value");
        console.log(sampleID);
        console.log(samplesData);
        createBarChart(sampleID);
        createBubbleChart(sampleID);
        displayMetadata(sampleID);
    });    
}

function optionChanged(sampleID) {
    // get data based on the sampleID
    console.log(sampleID);
    createBarChart(sampleID);
    createBubbleChart(sampleID);
    displayMetadata(sampleID);
}

function createBarChart(selectedID) {
    console.log(selectedID.toString());

    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var selectedData = samples.filter(object => object.id == selectedID)[0];
        // initialize webpage with data from first sampleID
        console.log(selectedData);

        // get sample_values first 10
        var revValues = selectedData.sample_values.slice(0,10).reverse();
        var otuIDs = selectedData.otu_ids.slice(0,10).reverse();
        var strRevIDs = otuIDs.map(row => "OTU " + row.toString());
        var revLabels = selectedData.otu_labels.slice(0,10).reverse();

        // horizontal bar chart
        var data0 = [{
            x: revValues,
            y: strRevIDs,
            text: revLabels,
            name: selectedID,
            type: "bar",
            orientation: "h"
        }];

        var layout0 = {
            barmode: "group",
            hovermode: "closest"
        };

        Plotly.newPlot("bar", data0, layout0);

    });
};

function createBubbleChart(selectedID) {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var selectedData = samples.filter(object => object.id == selectedID)[0];

        var otuIDstr = selectedData.otu_ids.map(String);
        console.log(otuIDstr);

        var data1 = [{
            x: selectedData.otu_ids,
            y: selectedData.sample_values,
            text: selectedData.otu_labels,
            mode: "markers",
            marker: {
                color: otuIDstr,
                size: selectedData.sample_values,
                colorscale: "Jet"
            }
        }];
    
        var layout1 = {
            xaxis: { title: "OTU ID"},
            hovermode: "closest",
            showlegend: false
        };
    
        Plotly.newPlot("bubble", data1, layout1);

    });
};

function displayMetadata(selectedID) {
    d3.json("data/samples.json").then((data) => {
        
        // display metadata
        // get reference to panel body
        var dataPanel = d3.select("#sample-metadata");
        // clear panel data
        dataPanel.html("");

        var metadata = data.metadata.filter(object => object.id == selectedID)[0];

        console.log(metadata);

        Object.entries(metadata).forEach(([key, value]) => {
            //var panelBody = dataPanel.append("div").attr("class","panel-body").text(`${key}: ${value}`);
            var panelBody = dataPanel.append("h6").text(`${key}: ${value}`);
        });
        freqGauge(metadata.wfreq);
        // hybridGauge(metadata.wfreq);
        // pieGauge(metadata.wfreq);

    });
};

init();




  