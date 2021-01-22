function getPlots(id){
   //Read samples.json
   d3.json("samples.json").then(sampledata =>
    {
        console.log(samledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)

    }) 
}