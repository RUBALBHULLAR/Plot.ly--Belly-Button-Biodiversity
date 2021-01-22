function getPlots(id){
   //Read samples.json
   d3.json("samples.json").then(sampledata =>
    {
        console.log(samledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

    }) 
}