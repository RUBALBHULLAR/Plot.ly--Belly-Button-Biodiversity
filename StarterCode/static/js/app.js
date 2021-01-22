function getPlots(id){
   //Read samples.json
   d3.json("samples.json").then(sampledata =>
    {
        console.log(samledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
        // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace ={
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        }


    }) 
}